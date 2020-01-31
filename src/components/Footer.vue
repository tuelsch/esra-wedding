<template>
  <footer class="footer">
    <g-image class="footer-background" :src="'/footer.jpg'"></g-image>
    <div class="footer-content">
      <button class="link" @click="resetPW">Reset password</button>
    </div>
  </footer>
</template>

<script>
import { mapMutations } from "vuex";
export default {
  methods: {
    ...mapMutations(["setMode"]),
    resetPW() {
      this.setMode(null);
    }
  }
};
</script>

<style lang="scss">
.footer {
  position: relative;
}
.footer-background {
  display: block;
  max-width: none;
  width: 100%;
}
.footer-content {
  position: absolute;
  left: 0;
  bottom: 1rem;
  width: 100%;
  color: white;
  text-align: center;

  * {
    text-shadow: 0 0 20px black;
  }
}
</style>