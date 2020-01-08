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
      @submit.prevent="checkPW"
      :class="{error: error}"
    >
      <input
        id="pw"
        name="pw"
        type="text"
        v-model="pw"
      >
      <button type="submit">Submit</button>
    </form>

  </Layout>
</template>

<script>
import Home from '@/admin/content/home.yml';
export default {
  name: 'Index',
  data() {
    return {
      pw: '',
      error: false,
    }
  },
  computed: {
    Home: () => Home,
  },
  methods: {
    checkPW() {
      this.error = false;
      if (this.pw === Home.apero_pw) {
        localStorage.setItem('pw', 'apero');
      } else if (this.pw === Home.fest_pw) {
        localStorage.setItem('pw', 'fest');
      } else {
        localStorage.setItem('pw', null);
        this.error = true;
      }

      if (!this.error) {
        this.$router.push('/About');
      }
    }
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
</style>
