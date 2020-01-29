<template>
  <div>
    <header class="header">
      <p class="h3">Esther & Raphael</p>
      <time class="h5">20.06.2020</time>
      <button class="navigation-toggler blank" @click="openNav">
        <span></span>
      </button>
    </header>
    <nav class="navigation">
      <a href="">Anmeldung</a>
      <a href="">Programm</a>
      <a href="">Anfahrt</a>
      <a href="">Bilder</a>
    </nav>
    <slot />
    <footer class="footer">
      <button @click="resetPW">Reset password</button>
    </footer>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<script>
import { mapMutations } from "vuex";

export default {
  mounted() {
    document
      .querySelector(".navigation-toggler")
      .addEventListener("click", () => {});
  },
  methods: {
    ...mapMutations(["setMode"]),
    openNav() {
      document.body.classList.toggle("navigation-open");
    },
    resetPW() {
      this.setMode(null);
    }
  }
};
</script>

<style lang="scss">
@import "~/styles/mediaqueries.scss";
.header {
  margin: 0 auto 1em auto;
  padding: 1em 0;
  transform: translateY(0) scale(1);
  // transition: transform 0.5s ease-in-out;

  @include max($xxs) {
    --base: 12px;
  }

  @include max($xs) {
    & > * {
      position: relative;
      z-index: 1;
    }
  }

  p {
    margin: 0 auto;

    @include min($xs) {
      display: flex;
      align-items: center;
      justify-content: center;

      &:before,
      &:after {
        display: block;
        content: "";
        width: 4rem;
        border-top: 1px solid black;
        margin: 0 2rem;
      }
    }
  }

  time {
    margin-top: 0;
  }
}

.navigation {
  margin: 1em auto;
  display: flex;
  justify-content: center;

  a:not(.active) {
    text-decoration: none;
  }

  @include min($xs) {
    a {
      margin: 0 1em;
    }
  }

  @include max($xs) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.95);

    align-items: center;
    flex-direction: column;

    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s, visibility 0s 0.3s;

    .navigation-open & {
      opacity: 1;
      visibility: visible;
      transition: opacity 0.3s, visibility 0s 0s;
    }

    a {
      margin: 1em auto;
      font-size: 1.5em;
    }
  }
}

.navigation-toggler {
  position: absolute;
  top: 2rem;
  right: 2rem;
  padding: 1rem;
  background: white;
  width: 33px;
  transition: width 0.3s 0.2s;

  @include min($xs) {
    display: none;
  }

  &:before,
  &:after,
  & > span {
    background-color: black;
    content: "";
    display: block;
    height: 3px;
    margin: 9px 0;
    transition: all 0.2s ease-in-out;
  }

  .navigation-open & {
    position: fixed;
    &:before {
      transform: translateY(12px) rotate(135deg);
    }

    &:after {
      transform: translateY(-12px) rotate(-135deg);
    }

    & > span {
      transform: scale(0);
    }
  }
}
</style>
