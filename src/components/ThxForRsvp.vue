<template>
  <div>
    <g-image class="esra-img" src="/img/esra.jpg"></g-image>
    <div class="thx rsvp-container">
      <h3>Anmeldung erfolgreich!!</h3>
      <p>Vielen Dank für deine Anmeldung, sie wurde erfolgreich gespeichert.</p>
      <p class="align-center">
        <button class="link" @click="showRsvp">Zusätzliche Anmeldung ausfüllen</button>
      </p>
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  methods: {
    ...mapMutations(["sendRsvp"]),
    showRsvp() {
      this.sendRsvp(false);
    }
  }
};
</script>
