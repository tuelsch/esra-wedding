import * as firebase from "firebase/app";
import "firebase/database";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBmx9xYGrKwN7Za1Sx3_frfTOE7x5Bqu94",
  authDomain: "esra-wedding.firebaseapp.com",
  databaseURL: "https://esra-wedding.firebaseio.com",
  projectId: "esra-wedding",
  storageBucket: "esra-wedding.appspot.com",
  messagingSenderId: "22375908890",
  appId: "1:22375908890:web:32afff2583a2db7054b3a3"
});

export default app;
