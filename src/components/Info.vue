<template>
  <div class="info">
    <g-image src="/img/esra.jpg" class="esra-img"></g-image>
    <div class="rsvp-container" v-html="$static.info.content"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<static-query>
  query {
    info:netlifyPages(path:"/src/admin/content/info") {
      content
    }
  }
</static-query>

<style lang="scss">
</style>
