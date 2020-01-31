<template>
  <section id="section-rsvp" class="container">
    <rsvp-apero v-if="!rsvpSent && mode === EMode.Apero" />
    <rsvp-fest v-if="!rsvpSent && mode === EMode.Fest" />
    <thx-for-rsvp v-if="rsvpSent" />
  </section>
</template>

<script>
import RsvpApero from "@/components/RSVP-Apero";
import ThxForRsvp from "@/components/ThxForRsvp";
import RsvpFest from "@/components/RSVP-Fest";
import EMode from "@/modules/EMode";
import { mapState } from "vuex";

export default {
  components: {
    RsvpApero,
    ThxForRsvp,
    RsvpFest
  },
  data() {
    return {
      EMode
    };
  },
  computed: {
    ...mapState(["rsvpSent", "mode"])
  }
};
</script>
