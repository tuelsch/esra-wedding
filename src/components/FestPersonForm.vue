<template>
  <div class="fest-person-form">
    <div class="row">
      <div
        class="input"
        :class="{ error: !v.firstname.required && v.firstname.$dirty }"
      >
        <input
          type="text"
          :id="'fest-firstname' + index"
          name="firstname"
          placeholder="Vorname"
          v-model="person.firstname"
        />
        <label for="fest-firstname">{{ $static.rsvp.firstname }}</label>
        <p class="error" v-show="!v.firstname.required && v.firstname.$dirty">
          {{ $static.rsvp.firstname_error }}
        </p>
      </div>
      <div
        class="input"
        :class="{ error: !v.lastname.required && v.lastname.$dirty }"
      >
        <input
          type="text"
          :id="'fest-lastname' + index"
          name="lastname"
          placeholder="Name"
          v-model="person.lastname"
        />
        <label for="fest-lastname">{{ $static.rsvp.lastname }}</label>
        <p class="error" v-show="!v.lastname.required && v.lastname.$dirty">
          {{ $static.rsvp.lastname_error }}
        </p>
      </div>
    </div>
    <div class="row">
      <span>{{ $static.rsvp.apero }}</span>
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
    <p class="error" v-show="!v.apero.required && v.apero.$dirty">
      {{ $static.rsvp.apero_error }}
    </p>
    <div class="row">
      <span>{{ $static.rsvp.fest }}</span>
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
    <p class="error" v-show="!v.fest.required && v.fest.$dirty">
      {{ $static.rsvp.fest_error }}
    </p>
    <div class="row">
      <span>{{ $static.rsvp.night }}</span>
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
    <p class="error" v-show="!v.night.required && v.night.$dirty">
      {{ $static.rsvp.night_error }}
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
        <label for="fest-comments">{{ $static.rsvp.comments }}</label>
      </div>
    </div>
    <div class="row align-right">
      <button @click="deletePerson" v-show="index > 0">Löschen</button>
      <button @click="savePerson">Speichern</button>
    </div>
  </div>
</template>

<static-query>
  query {
    rsvp:netlifyPages(path:"/src/admin/content/rsvp-fest") {
      firstname,
      firstname_error,
      lastname,
      lastname_error,
      apero,
      apero_error,
      fest,
      fest_error,
      night,
      night_error
      comments,
    }
  }
</static-query>

<script>
import { validationMixin } from "vuelidate";
import { required, minValue } from "vuelidate/lib/validators";
import { mapMutations, mapState } from "vuex";

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

.fest-person-form {
  .row {
    margin-top: 2rem;
    margin-bottom: 2rem;
  }
}
</style>
