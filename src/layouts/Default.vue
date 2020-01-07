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

<style>
@import url('https://fonts.googleapis.com/css?family=Great+Vibes|Poiret+One&display=swap');

body {
  margin:0;
  padding:0;
  line-height: 1.5;
  font-family: 'Poiret One', 'Segoe UI', 'Helvetica Neue', sans-serif;
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

@media (max-width: 1024px) {
  body {
    font-size: 18px;
  }
}

@media (min-width: 1024px) {
  body {
    font-size: 24px;
  }
}
</style>
