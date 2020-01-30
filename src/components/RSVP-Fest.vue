<template>
  <div class="rsvp-fest">
    <p>TODO: CMS Anmeldung Fest</p>
    <ul class="persons-list">
      <li v-for="(person, index) in persons" :key="index">
        <fest-person-form
          :person="person"
          :v="$v.persons.$each[index]"
          :index="index"
          @deletePerson="deletePerson"
          @validPerson="validPerson"
          v-if="person.editMode"
        />
        <div class="summary row" v-if="!person.editMode">
          <div>
            <img class="profile-img" src="/person.png" alt />
            <span>{{ person.firstname }} {{ person.lastname }}</span>
          </div>
          <div>
            <button class="underlined" @click="editPerson(index)">Bearbeiten</button>
            <button class="underlined" title="Löschen" @click="deletePerson(index)">
              <img src="/bin.png" alt />
              <span class="sr-only">Löschen</span>
            </button>
          </div>
        </div>
      </li>
      <li class="add-person">
        <button class="underlined" @click="addPerson" :disabled="hasEditModePerson">
          <img class="profile-img" src="/add-person.png" alt />
          <span>Gast hinzufügen</span>
        </button>
      </li>
    </ul>
    <div class="row align-center">
      <button class="fancy" :disabled="rsvpSent || sending" @click="sendForm">Senden</button>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import { mapMutations, mapState } from "vuex";
import FestPersonForm from "@/components/FestPersonForm";

const defaultPersonData = () => ({
  firstname: "",
  lastname: "",
  editMode: true,
  apero: null,
  fest: null,
  night: null,
  comments: ""
});

export default {
  mixins: [validationMixin],
  components: {
    FestPersonForm
  },
  data() {
    return {
      persons: [new defaultPersonData()],
      sending: false,
      database: null
    };
  },
  async mounted() {
    const { default: firebase } = await import("@/firebase");
    this.database = firebase.database();
  },
  validations: {
    persons: {
      required,
      minLength: minLength(1),
      $each: {
        firstname: {
          required
        },
        lastname: {
          required
        },
        apero: {
          required
        },
        fest: {
          required
        },
        night: {
          required
        }
      }
    }
  },
  computed: {
    ...mapState(["rsvpSent"]),
    hasEditModePerson() {
      return !!this.persons.filter(p => p.editMode).length;
    }
  },
  methods: {
    ...mapMutations(["sendRsvp"]),
    addPerson() {
      this.persons.push(new defaultPersonData());
      this.$v.persons.$each[this.persons.length - 1].$reset();
    },
    deletePerson(index) {
      this.persons = this.persons.filter((p, i) => i !== index);
    },
    validPerson(index) {
      this.persons[index].editMode = false;
    },
    editPerson(index) {
      this.persons[index].editMode = true;
    },
    async sendForm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.sending = true;

        try {
          await this.database.ref("fest").push({
            persons: this.persons,
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

<style lang="scss">
.summary,
.add-person {
  align-items: center;

  > div {
    display: flex;
    align-items: center;
  }

  & .profile-img {
    width: 2em;
    margin-right: 1em;
  }

  & span {
    font-weight: 700;
  }

  & button {
    border: none;
    font-weight: 300;

    img {
      width: 1.4em;
    }
  }
}
.add-person {
  button {
    margin: 1em 0;
    padding-left: 0;
    display: flex;
    align-items: center;
  }
}
.persons-list {
  padding-left: 0;
  list-style: none;

  li {
    border-bottom: 1px solid black;
    &:first-child {
      border-top: 1px solid black;
    }
  }
}
</style>
