<template>
  <section id="section-rsvp" class="container">
    <rsvp-apero v-show="!rsvpSent && mode === EMode.Apero" />
    <rsvp-fest v-show="!rsvpSent && mode === EMode.Fest" />
    <thx-for-rsvp v-show="rsvpSent" />
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

<style lang="scss">
@import "~/styles/mediaqueries.scss";

.rsvp-container {
  @include min($xs) {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }
}

.esra-img {
  display: block;
  margin: 1em auto;

  @include min($s) {
    width: 20rem;
    margin-left: -10rem;
    margin-right: 5rem;
  }

  @include between($xs, $s) {
    width: 10rem;
    //margin-left: -5rem;
    margin-right: 2.5rem;
  }

  @include max($xs) {
    max-width: 75%;
  }
}
</style>
