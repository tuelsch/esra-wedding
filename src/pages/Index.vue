<template>
  <layout>
    <login v-if="!mode" />
    <about v-if="mode" />
  </layout>
</template>

<script>
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
    ...mapState(["mode"])
  }
};
</script>

<style lang="scss"></style>
