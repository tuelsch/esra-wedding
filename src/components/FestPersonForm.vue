<template>
  <div class="fest-person-form">
    <div class="row">
      <div
        class="input"
        :class="{ error: !v.firstname.required && v.firstname.$dirty }"
      >
        <input
          type="text"
          id="apero-firstname"
          name="firstname"
          placeholder="Vorname"
          v-model="person.firstname"
        />
        <label for="apero-firstname">Vorname</label>
        <p class="error" v-if="!v.firstname.required && v.firstname.$dirty">
          Bitte gib einen Vornamen ein.
        </p>
      </div>
      <div
        class="input"
        :class="{ error: !v.lastname.required && v.lastname.$dirty }"
      >
        <input
          type="text"
          id="apero-lastname"
          name="lastname"
          placeholder="Name"
          v-model="person.lastname"
        />
        <label for="apero-lastname">Name</label>
        <p class="error" v-if="!v.lastname.required && v.lastname.$dirty">
          Bitte gib einen Nachnamen ein.
        </p>
      </div>
    </div>
    <div class="row">
      <span>Apéro</span>
      <div
        class="radio"
        :class="{ error: !v.apero.required && v.apero.$dirty }"
      >
        <input
          type="radio"
          :id="index + 'apero-ja'"
          name="apero"
          :value="true"
          v-model="person.apero"
        />
        <label :for="index + 'apero-ja'">
          <span>Ja</span>
        </label>
        <input
          type="radio"
          :id="index + 'apero-nein'"
          name="apero"
          :value="false"
          v-model="person.apero"
        />
        <label :for="index + 'apero-nein'">
          <span>Nein</span>
        </label>
      </div>
    </div>
    <p class="error" v-if="!v.apero.required && v.apero.$dirty">
      Nimmst du am Apéro teil?
    </p>
    <div class="row">
      <span>Abendessen (nur Erwachsene)</span>
      <div class="radio" :class="{ error: !v.fest.required && v.fest.$dirty }">
        <input
          type="radio"
          :id="index + 'fest-ja'"
          name="fest"
          :value="true"
          v-model="person.fest"
        />
        <label :for="index + 'fest-ja'">
          <span>Ja</span>
        </label>
        <input
          type="radio"
          :id="index + 'fest-nein'"
          name="fest"
          :value="false"
          v-model="person.fest"
        />
        <label :for="index + 'fest-nein'">
          <span>Nein</span>
        </label>
      </div>
    </div>
    <p class="error" v-if="!v.fest.required && v.fest.$dirty">
      Nimmst du am Abendessen teil?
    </p>
    <div class="row">
      <span>Übernachtung im Hirschen</span>
      <div
        class="radio"
        :class="{ error: !v.night.required && v.night.$dirty }"
      >
        <input
          type="radio"
          :id="index + 'night-ja'"
          name="night"
          :value="true"
          v-model="person.night"
        />
        <label :for="index + 'night-ja'">
          <span>Ja</span>
        </label>
        <input
          type="radio"
          :id="index + 'night-nein'"
          name="night"
          :value="false"
          v-model="person.night"
        />
        <label :for="index + 'night-nein'">
          <span>Nein</span>
        </label>
      </div>
    </div>
    <p class="error" v-if="!v.night.required && v.night.$dirty">
      Möchtest du im Hirschen Übernachten?
    </p>
    <div class="row">
      <div class="input">
        <textarea
          name="fest-comments"
          id="fest-comments"
          rows="10"
          placeholder="Bemerkungen, Allergien, Vegetarisch"
          v-model="person.comments"
        ></textarea>
        <label for="fest-comments">
          Bemerkungen, Allergien, Vegetarisch, etc.
        </label>
      </div>
    </div>
    <div class="row align-right">
      <button @click="deletePerson" v-if="index > 0">Löschen</button>
      <button @click="savePerson">Speichern</button>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minValue } from "vuelidate/lib/validators";
import firebase from "@/firebase";
import { mapMutations, mapState } from "vuex";

const database = firebase.database();

export default {
  mixins: [validationMixin],
  props: {
    person: Object,
    v: Object,
    index: Number
  },
  methods: {
    deletePerson() {
      this.$emit("deletePerson", this.index);
    },
    savePerson() {
      this.v.$touch();
      if (!this.v.$invalid) {
        this.$emit("validPerson", this.index);
      }
    }
  }
};
</script>

<style lang="scss">
.radio {
  white-space: nowrap;
}
</style>
