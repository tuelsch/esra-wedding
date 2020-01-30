<template>
  <section class="about container">
    <rsvp-apero v-if="!rsvpSent && mode === 'apero'" />
    <rsvp-fest v-if="!rsvpSent && mode === 'fest'" />
    <thx-for-rsvp v-if="rsvpSent" />
  </section>
</template>

<script>
import RsvpApero from "@/components/RSVP-Apero";
import ThxForRsvp from "@/components/ThxForRsvp";
import RsvpFest from "@/components/RSVP-Fest";
import { mapState } from "vuex";

export default {
  components: {
    RsvpApero,
    ThxForRsvp,
    RsvpFest
  },
  computed: {
    ...mapState(["rsvpSent", "mode"])
  }
};
</script>

<style lang="scss"></style>
