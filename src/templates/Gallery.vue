<template>
  <layout>
    <section class="gallery-container">
      <aside>
        <nav>
          <g-link
            v-for="(gallery, index) in galleries"
            :key="index"
            :to="gallery.href"
          >{{gallery.node.title}}</g-link>
        </nav>
      </aside>
      <main class="gallery">
        <g-image :src="image.image" v-for="(image, index) in $page.gallery.images" :key="index"></g-image>
      </main>
    </section>
  </layout>
</template>

<page-query>
query Page ($id:ID!) {
  galleries:allGallery {
    edges {
      node {
        visible_fest,
        visible_apero,
        title
      }
    }
  }
  gallery:gallery(id:$id) {
    id,
    title,
    visible_fest,
    visible_apero,
    images {
      image
    }
  }
}
</page-query>

<script>
export default {
  computed: {
    galleries() {
      return this.$store.getters
        .getGalleryLinks(this.$page.galleries.edges)
        .map(gallery => {
          gallery.href = `/gallery/${gallery.node.title.toLowerCase()}`;
          return gallery;
        });
    }
  }
};
</script>