<template>
  <layout>
    <login v-if="!mode" />
    <rsvp v-if="mode" />
    <program v-if="mode" />
    <map-component v-if="mode" />
  </layout>
</template>

<script>
import Login from "@/components/Login";
import Rsvp from "@/components/Rsvp";
import Program from "@/components/Program";
import MapComponent from "@/components/Map";
import { mapState } from "vuex";

export default {
  name: "Index",
  components: {
    Login,
    Rsvp,
    Program,
    MapComponent
  },
  computed: {
    ...mapState(["mode"])
  }
};
</script>
