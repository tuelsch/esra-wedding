<template>
  <div class="thx">
    <h3>Anmeldung erfolgreich!!</h3>
    <p>Vielen Dank für deine Anmeldung, sie wurde erfolgreich gespeichert.</p>
    <p>
      <button @click="showRsvp">Zusätzliche Anmeldung ausfüllen</button>
    </p>
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
