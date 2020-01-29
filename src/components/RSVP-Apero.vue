<template>
  <div>
    <p>Anmeldung fürs Apéro am 20. Juni 2020 im Würzbrunnen Kilchli</p>
    <div class="row">
      <div
        class="input"
        :class="{ error: !$v.firstname.required && $v.firstname.$dirty }"
      >
        <input
          type="text"
          id="apero-firstname"
          name="firstname"
          placeholder="Vorname"
          v-model="firstname"
        />
        <label for="apero-firstname">Vorname</label>
        <p class="error" v-if="!$v.firstname.required && $v.firstname.$dirty">
          Bitte gib deinen Vornamen ein.
        </p>
      </div>
      <div
        class="input"
        :class="{ error: !$v.lastname.required && $v.lastname.$dirty }"
      >
        <input
          type="text"
          id="apero-lastname"
          name="lastname"
          placeholder="Name"
          v-model="lastname"
        />
        <label for="apero-lastname">Name</label>
        <p class="error" v-if="!$v.lastname.required && $v.lastname.$dirty">
          Bitte gib deinen Nachnamen ein.
        </p>
      </div>
    </div>
    <div class="row">
      <div
        class="input"
        :class="{ error: !$v.adults.required && $v.adults.$dirty }"
      >
        <input
          type="number"
          min="0"
          id="apero-adults"
          name="adults"
          placeholder="Anzahl Erwachsene"
          v-model="adults"
        />
        <label for="apero-adults">Anzahl Erwachsene</label>
        <p class="error" v-if="!$v.adults.required && $v.adults.$dirty">
          Bitte gib die Anzahl Erwachsene ein.
        </p>
      </div>
      <div
        class="input"
        :class="{ error: !$v.children.required && $v.children.$dirty }"
      >
        <input
          type="number"
          min="0"
          id="apero-children"
          name="children"
          placeholder="Anzahl Kinder"
          v-model="children"
        />
        <label for="apero-children">Anzahl Kinder</label>
        <p class="error" v-if="!$v.children.required && $v.children.$dirty">
          Bitte gib die Anzahl Kinder ein.
        </p>
      </div>
    </div>
    <div class="row">
      <div class="input">
        <textarea
          name="comments"
          id="apero-comments"
          rows="10"
          placeholder="Bemerkungen"
          v-model="comments"
        ></textarea>
        <label for="apero-comments">Bemerkungen</label>
      </div>
    </div>
    <div class="row align-center">
      <button class="fancy" :disabled="rsvpSent || sending" @click="checkForm">
        Senden
      </button>
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
  data() {
    return {
      firstname: "",
      lastname: "",
      adults: null,
      children: null,
      comments: "",
      sending: false
    };
  },

  validations: {
    firstname: {
      required
    },
    lastname: {
      required
    },
    adults: {
      required,
      minValue: minValue(0)
    },
    children: {
      required,
      minValue: minValue(0)
    }
  },

  computed: {
    ...mapState(["rsvpSent"])
  },

  methods: {
    ...mapMutations(["sendRsvp"]),
    async checkForm() {
      // Validate the fields
      this.$v.$touch();

      if (!this.$v.$invalid) {
        try {
          this.sending = true;
          await database.ref("apero").push({
            firstname: this.firstname,
            lastname: this.lastname,
            adults: this.adults,
            children: this.children,
            comments: this.comments,
            created: Date.now()
          });

          this.sendRsvp(true);
        } catch (error) {
          console.error(error);
        }
        this.sending = false;
      }
    }
  }
};
</script>
