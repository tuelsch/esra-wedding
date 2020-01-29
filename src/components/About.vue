<template>
  <section class="about">
    <h2>Anmeldung</h2>
    <rsvp-apero v-if="!rsvpSent && mode === 'apero'" />
    <thx-for-rsvp v-if="rsvpSent" />
  </section>
</template>

<script>
import RsvpApero from "@/components/RSVP-Apero";
import ThxForRsvp from "@/components/ThxForRsvp";
import { mapState } from "vuex";

export default {
  components: {
    RsvpApero,
    ThxForRsvp
  },
  computed: {
    ...mapState(["rsvpSent", "mode"])
  }
};
</script>

<style lang="scss"></style>
