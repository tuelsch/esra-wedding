<template>
  <Layout>

    <!-- Learn how to use images here: https://gridsome.org/docs/images -->
    <div class="background">
      <g-image alt="Hintergrundbild" :src="Home.background" />
    </div>

    <header class="header">
      <h1>{{Home.title}}</h1>
      <time class="h5">{{Home.date}}</time>
    </header>

    <form
      name="test"
      method="post"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
    >
      <input type="hidden" name="form-name" value="test">
      <input name="fav_song" type="text" id="fav_song">
      <label for="vegetarian">
        <input name="vegetarian" type="checkbox" id="vegetarian">
        Vegetarian
      </label>
      <button type="submit">Submit</button>
    </form>

  </Layout>
</template>

<script>
import Home from '@/admin/content/home.yml';
export default {
  computed: {
    Home: () => Home,
  },
  metaInfo: {
    title: 'Hello, world!'
  }
}
</script>

<style>
  body {
    min-height: 100vh;
  }

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
  }

  .layout {
    display: grid;
    place-content: center;
    height: 100vh;
  }

  .header {
    text-align: center;
  }

  .header h1 {
    font-size: 64px;
  }
</style>
