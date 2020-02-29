<template>
  <div>
    <g-image class="esra-img" src="/img/esra.jpg"></g-image>
    <div class="thx rsvp-container">
      <div v-html="$static.rsvp.content"></div>
      <p class="align-center">
        <button class="link" @click="showRsvp">{{ $static.rsvp.add_invite }}</button>
      </p>
    </div>
  </div>
</template>

<static-query>
  query {
    rsvp:netlifyPages(path:"/src/admin/content/rsvp-thx") {
      content,
      add_invite
    }
  }
</static-query>

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
