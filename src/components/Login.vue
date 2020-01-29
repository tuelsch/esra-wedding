<template>
  <div class="login">
    <!-- Learn how to use images here: https://gridsome.org/docs/images -->
    <div class="background">
      <g-image alt="Hintergrundbild" :src="Home.background" />
    </div>

    <form
      name="test"
      class="pw-form"
      @submit.prevent="checkPW"
      :class="{ error: error }"
    >
      <div class="input">
        <input
          id="pw"
          name="pw"
          type="text"
          title="Gib hier deinen Code ein"
          placeholder="Gib hier deinen Code ein"
          autocomplete="off"
          v-model="pw"
        />
        <label class="pw-label" for="pw">Gib hier deinen Code ein</label>
        <button class="submit" type="submit" :class="{ ok: !!pw }">
          <img aria-hidden="true" src="/arrow-right.svg" alt="Pfeil rechts" />
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import Home from "@/admin/content/home.yml";
import { mapMutations, mapState } from "vuex";

export default {
  name: "Index",
  data() {
    return {
      pw: "",
      error: false
    };
  },
  computed: {
    ...mapState(["mode"]),
    Home: () => Home
  },
  methods: {
    ...mapMutations(["setMode"]),
    checkPW() {
      this.error = false;
      this.setMode(this.pw);

      if (!this.mode) {
        this.error = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.background {
  display: grid;
  place-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -1;
}

.background > img {
  width: 100%;
  height: 100vh;
  object-fit: cover;
  object-position: bottom;
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
  position: absolute;
  display: flex;
  justify-content: center;
  top: 50%;
  width: 100%;

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
</style>
