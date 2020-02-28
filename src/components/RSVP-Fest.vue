<template>
  <div class="rsvp-fest">
    <g-image class="esra-img" src="/img/esra.jpg"></g-image>
    <div class="rsvp-container">
      <div v-html="$static.rsvp.content"></div>
      <ul class="persons-list">
        <li v-for="(person, index) in persons" :key="index">
          <fest-person-form
            :person="person"
            :v="$v.persons.$each[index]"
            :index="index"
            @deletePerson="deletePerson"
            @validPerson="validPerson"
            v-show="person.editMode"
          />
          <div class="summary row mobile" v-show="!person.editMode">
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
            <span>{{ $static.rsvp.add_person }}</span>
          </button>
        </li>
      </ul>
      <div class="row align-center">
        <button class="fancy" :disabled="rsvpSent || sending" @click="sendForm">Senden</button>
      </div>
    </div>
  </div>
</template>

<static-query>
  query {
    rsvp:netlifyPages(path:"/src/admin/content/rsvp-fest") {
      content,
      add_person
    }
  }
</static-query>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import { mapMutations, mapState } from "vuex";
import FestPersonForm from "@/components/FestPersonForm";
import scrollto from "@/modules/scrollto";

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
    scrollTo(id) {
      document.getElementById(id).scrollIntoView({
        behavior: "smooth"
      });
    },
    addPerson() {
      this.persons.push(new defaultPersonData());
      this.$v.persons.$each[this.persons.length - 1].$reset();
    },
    deletePerson(index) {
      this.persons = this.persons.filter((p, i) => i !== index);
    },
    validPerson(index) {
      this.persons[index].editMode = false;
      this.scrollTo("section-rsvp");
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
          this.persons = [new defaultPersonData()];
          this.$v.$reset();
          this.scrollTo("section-rsvp");
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
    justify-content: flex-end;
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
    flex-shrink: 0;

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
    border-top: 2px solid black;
    &:first-child {
      border-top: none;
    }
  }
}
</style>
