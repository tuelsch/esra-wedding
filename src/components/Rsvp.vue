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
  position: relative;
  border-radius: 20px;
  background: white;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.33);
  padding: 2rem;
  margin: 1rem auto;

  & > div {
    > h1,
    > h2,
    > h3,
    > h4,
    > h5,
    > h6,
    > p {
      margin-top: 0.5rem;
    }
  }
}

.esra-img {
  display: block;

  @include min($s) {
    margin: 3rem auto -5rem -22%;
    //margin: calc(-16.5% - 2rem) auto 0 auto;
    max-width: 33%;
  }

  @include max($s) {
    margin: 1em auto;
    max-width: 50%;
  }
}
</style>
