<template>
  <main class="login container">
    <form name="test" class="pw-form" @submit.prevent="checkPW" :class="{ error: error }">
      <h1>{{$static.login.title}}</h1>
      <time class="h3">{{$static.login.date}}</time>
      <div class="input">
        <input
          id="pw"
          name="pw"
          type="text"
          :title="$static.login.code"
          :placeholder="$static.login.code"
          autocomplete="off"
          v-model="pw"
        />
        <label class="pw-label" for="pw">{{$static.login.code}}</label>
        <button class="submit" type="submit" :class="{ ok: !!pw }">
          <img aria-hidden="true" src="/arrow-right.svg" alt="Pfeil rechts" />
        </button>
      </div>
      <g-image class="fleck" alt="Hintergrundbild" :src="$static.login.background" />
    </form>
  </main>
</template>

<static-query>
  query {
    login:netlifyPages(path:"/src/admin/content/home") {
      apero_pw,
      fest_pw,
      background,
      title,
      date,
      code
    }
  }
</static-query>

<script>
import { mapMutations, mapState } from "vuex";
import EMode from "@/modules/EMode";

export default {
  name: "Index",
  data() {
    return {
      pw: "",
      error: false
    };
  },
  computed: {
    ...mapState(["mode"])
  },
  methods: {
    ...mapMutations(["setMode"]),
    checkPW() {
      this.error = false;
      if (this.pw === this.$static.login.apero_pw) {
        this.setMode(EMode.Apero);
      } else if (this.pw === this.$static.login.fest_pw) {
        this.setMode(EMode.Fest);
      } else {
        this.setMode(null);
        this.error = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~/styles/mediaqueries.scss";
.login {
  min-height: 100vh;
  max-width: 40em;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
}

.submit {
  background: none;
  padding: 0;
  border: none;

  img {
    filter: brightness(5);
    opacity: 0.3;
    transition: filter 0.2s, opacity 0.2s;
    height: 1.5em;
  }

  &.ok img {
    filter: brightness(1);
    opacity: 1;
  }
}

.pw-form {
  h1 {
    white-space: nowrap;
    margin-bottom: 0;

    @include max($xxs) {
      font-size: calc(var(--base) * 1.25 * 2);
    }
  }

  time {
    margin-top: 0;
    @include max($xxs) {
      font-size: calc(var(--base) * 1.25 * 1);
    }
  }

  input[name="pw"] {
    padding-right: 1.5em;
  }
}

.input {
  display: flex;
  align-items: flex-start;

  input {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }

  .pw-label {
    position: relative;
    margin-right: 1rem;
  }
}

.login-active {
  .header {
    transform: translateY(calc(50vh - 100%)) scale(1.6);
  }

  .navigation,
  .navigation-toggler {
    display: none;
  }

  .header p {
    &:before,
    &:after {
      width: 0;
    }
  }
}

.fleck {
  display: block;
  max-width: 80vw;
  margin: 2em auto;
}
</style>
