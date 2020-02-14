<template>
  <div>
    <page-header v-show="mode" />
    <navigation v-show="mode" />
    <main>
      <slot />
    </main>
    <page-footer v-show="mode" />
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  },
}
</static-query>

<script>
import PageHeader from "@/components/Header";
import Navigation from "@/components/Navigation";
import PageFooter from "@/components/Footer";
import { mapState } from "vuex";

export default {
  components: {
    Navigation,
    PageHeader,
    PageFooter
  },
  computed: {
    ...mapState(["mode"])
  }
};
</script>
