// Copyright 2017 Google LLC.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import * as functions from "firebase-functions";
import * as _ from "lodash";
import { google } from "googleapis";
const sheets = google.sheets("v4");

const spreadsheetId = "1pQ7hh9OKpAy6elcZePu2yQl1UNsk4aRk_FW83ZPRi44";

const serviceAccount = require("../credentials.json");

const jwtClient = new google.auth.JWT({
  email: serviceAccount.client_email,
  key: serviceAccount.private_key,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"] // read and write sheets
});
const jwtAuthPromise = jwtClient.authorize();

type Apero = {
  adults: number;
  children: number;
  comments: string;
  created: number;
  firstname: string;
  lastname: string;
};

type Fest = {
  familyId: string;
  firstname: string;
  lastname: string;
  apero: boolean;
  fest: boolean;
  night: boolean;
  comments: string;
  date: number;
};

export const copyFestToSheet = functions.database
  .ref("/fest/{id}")
  .onCreate(async change => {
    const rsvp = change.val();
    const data: Fest[] = rsvp.persons.map(
      (person: any): Fest => {
        person.familyId = rsvp.id;
        person.date = rsvp.date;
        return person;
      }
    );
    const payload = data.map(person => {
      return [
        person.familyId,
        person.firstname,
        person.lastname,
        person.apero,
        person.fest,
        person.night,
        person.comments,
        person.date
      ];
    });
    console.log(JSON.stringify(payload));

    try {
      await jwtAuthPromise;
      await sheets.spreadsheets.values.append({
        auth: jwtClient,
        spreadsheetId: spreadsheetId,
        range: "Fest!A:H", // update this range of cells
        valueInputOption: "RAW",
        insertDataOption: "INSERT_ROWS",
        requestBody: {
          values: payload
        }
      });
    } catch (error) {}
  });

export const copyScoresToSheet = functions.database
  .ref("/apero/{id}")
  .onCreate(async change => {
    const data: Apero = change.val();
    try {
      await jwtAuthPromise;
      await sheets.spreadsheets.values.append({
        auth: jwtClient,
        spreadsheetId: spreadsheetId,
        range: "Apero!A:F", // update this range of cells
        valueInputOption: "RAW",
        insertDataOption: "INSERT_ROWS",
        requestBody: {
          values: [
            [
              data.firstname,
              data.lastname,
              data.adults,
              data.children,
              data.comments,
              data.created
            ]
          ]
        }
      });
    } catch (error) {
      console.error(error);
    }
  });
