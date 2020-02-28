<template>
  <div class="apero-rsvp">
    <g-image src="/img/esra.jpg" class="esra-img"></g-image>
    <div class="rsvp-container">
      <div v-html="$static.rsvp.content"></div>
      <div class="row">
        <div class="input" :class="{ error: !$v.firstname.required && $v.firstname.$dirty }">
          <input
            type="text"
            id="apero-firstname"
            name="firstname"
            placeholder="$static.rsvp.firstname"
            v-model="firstname"
          />
          <label for="apero-firstname">{{ $static.rsvp.firstname }}</label>
          <p
            class="error"
            v-show="!$v.firstname.required && $v.firstname.$dirty"
          >{{ $static.rsvp.firstname_error }}</p>
        </div>
        <div class="input" :class="{ error: !$v.lastname.required && $v.lastname.$dirty }">
          <input
            type="text"
            id="apero-lastname"
            name="lastname"
            placeholder="$static.rsvp.lastname"
            v-model="lastname"
          />
          <label for="apero-lastname">{{ $static.rsvp.lastname }}</label>
          <p
            class="error"
            v-show="!$v.lastname.required && $v.lastname.$dirty"
          >{{ $static.rsvp.lastname_error }}</p>
        </div>
      </div>
      <div class="row">
        <div class="input" :class="{ error: !$v.adults.required && $v.adults.$dirty }">
          <input
            type="number"
            min="0"
            id="apero-adults"
            name="adults"
            placeholder="$static.rsvp.adults"
            v-model="adults"
          />
          <label for="apero-adults">{{ $static.rsvp.adults }}</label>
          <p
            class="error"
            v-show="!$v.adults.required && $v.adults.$dirty"
          >{{ $static.rsvp.adults_error }}</p>
        </div>
        <div class="input" :class="{ error: !$v.children.required && $v.children.$dirty }">
          <input
            type="number"
            min="0"
            id="apero-children"
            name="children"
            placeholder="$static.rsvp.children"
            v-model="children"
          />
          <label for="apero-children">{{ $static.rsvp.children }}</label>
          <p
            class="error"
            v-show="!$v.children.required && $v.children.$dirty"
          >{{ $static.rsvp.children_error }}</p>
        </div>
      </div>
      <div class="row">
        <div class="input">
          <textarea
            name="comments"
            id="apero-comments"
            rows="10"
            placeholder="$static.rsvp.comments"
            v-model="comments"
          ></textarea>
          <label for="apero-comments">{{ $static.rsvp.comments }}</label>
        </div>
      </div>
      <div class="row align-center">
        <button class="fancy" :disabled="rsvpSent || sending" @click="checkForm">Senden</button>
      </div>
    </div>
  </div>
</template>

<static-query>
  query {
    rsvp:netlifyPages(path:"/src/admin/content/rsvp-apero") {
      firstname,
      firstname_error,
      lastname,
      lastname_error,
      adults,
      adults_error,
      children,
      children_error,
      comments,
      content
    }
  }
</static-query>

<script>
import { validationMixin } from "vuelidate";
import { required, minValue } from "vuelidate/lib/validators";
import { mapMutations, mapState } from "vuex";
import scrollto from "@/modules/scrollto";

export default {
  mixins: [validationMixin],
  data() {
    return {
      firstname: "",
      lastname: "",
      adults: null,
      children: null,
      comments: "",
      sending: false,
      database: null
    };
  },

  async mounted() {
    const { default: firebase } = await import("@/firebase");
    this.database = firebase.database();
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
          await this.database.ref("apero").push({
            firstname: this.firstname,
            lastname: this.lastname,
            adults: this.adults,
            children: this.children,
            comments: this.comments,
            created: Date.now()
          });
          this.firstname = "";
          this.lastname = "";
          this.adults = "";
          this.children = "";
          this.comments = "";
          this.$v.$reset();
          scrollto("section-rsvp");
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

<style lang="scss">
.apero-rsvp {
  .row {
    margin-top: 3rem;
    margin-bottom: 3rem;
  }
}
</style>
