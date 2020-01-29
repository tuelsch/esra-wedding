<template>
  <layout>
    <login v-show="!mode" />
    <about v-show="mode" />
  </layout>
</template>

<script>
import Home from "@/admin/content/home.yml";
import Login from "@/components/Login";
import About from "@/components/About";
import { mapState } from "vuex";

export default {
  name: "Index",
  components: {
    Login,
    About
  },
  computed: {
    ...mapState(["mode"]),
    Home: () => Home
  }
};
</script>

<style lang="scss"></style>
