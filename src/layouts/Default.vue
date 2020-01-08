<template>
  <div class="layout">
    <slot/>
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
}
</static-query>

<style lang="scss">
@import 'src/styles/mediaqueries';

@import url('https://fonts.googleapis.com/css?family=Comfortaa:300,700|Great+Vibes&display=swap');

body {
  margin:0;
  padding:0;
  line-height: 1.5;
  font-family: 'Comfortaa', 'Segoe UI', 'Helvetica Neue', sans-serif;
  font-weight: 300;

  @include max($sm) {
    font-size: 24px;
  }

  @include min($sm) {
    font-size: 18px;
  }
}

input,
a {
  font: inherit;
}

h1, .h1,
h2, .h2,
h3, .h3,
h4, .h4,
h5, .h5,
h6, .h6 {
  font-family: 'Great Vibes', 'Helvetica Neue', sans-serif;
  font-weight: normal;
}
</style>
