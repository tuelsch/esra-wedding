<template>
  <section id="section-program" class="program container">
    <div class v-show="mode === EMode.Apero" v-html="$static.program_apero.content"></div>
    <div class v-show="mode === EMode.Fest" v-html="$static.program_fest.content"></div>
  </section>
</template>

<static-query>
query {
  program_apero:netlifyPages(path:"/src/admin/content/program-apero") {
    content,
  },
  program_fest:netlifyPages(path:"/src/admin/content/program-fest") {
    content,
  }
}
</static-query>

<script>
import EMode from "@/modules/EMode";
import { mapState } from "vuex";

export default {
  data() {
    return {
      EMode
    };
  },
  computed: {
    ...mapState(["mode"])
  }
};
</script>

<style lang="scss">
.program {
  text-align: center;
}
</style>