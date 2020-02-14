<template>
  <header class="header">
    <p class="h3">{{ $static.home.title }}</p>
    <time class="h5">{{ $static.home.date }}</time>
    <button class="navigation-toggler blank" @click="openNav">
      <span></span>
      <span class="sr-only">Navigation öffnen</span>
    </button>
  </header>
</template>

<static-query>
query {
  home:netlifyPages(path:"/src/admin/content/home") {
    title,
    date,
  }
}
</static-query>

<script>
export default {
  methods: {
    openNav() {
      document.body.classList.toggle("navigation-open");
    }
  }
};
</script>

<style lang="scss">
@import "~/styles/mediaqueries.scss";
.header {
  width: 100%;
  margin: 0 auto 1em auto;
  padding: 1em 0;

  @include max($xxs) {
    --base: 12px;
  }

  @include max($xs) {
    position: relative;
    z-index: 2;
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
    margin-bottom: 0;
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

  &:focus {
    outline: none;
  }

  @include min($xs) {
    display: none;
  }

  @include max($xxs) {
    right: 1rem;
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
