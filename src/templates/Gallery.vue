<template>
  <layout>
    <section class="gallery-container">
      <aside>
        <nav class="gallery-nav">
          <g-link
            v-for="(gallery, index) in galleries"
            :key="index"
            :to="gallery.href"
            >{{ gallery.node.title }}</g-link
          >
        </nav>
      </aside>
      <div class="gallery" :class="{ loaded }">
        <g-image
          :src="image.image"
          v-for="(image, index) in $page.gallery.images"
          :key="index"
          data-zoomable
          @load="imageLoaded()"
        ></g-image>
      </div>
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
import Masonry from "masonry-layout";
import mediumZoom from "medium-zoom";

let masonry;
let zoom = mediumZoom();

export default {
  data() {
    return {
      loadedImages: 0,
      loaded: false
    };
  },
  computed: {
    galleries() {
      return this.$store.getters
        .getGalleryLinks(this.$page.galleries.edges)
        .map(gallery => {
          gallery.href = `/gallery/${gallery.node.title.toLowerCase()}`;
          return gallery;
        });
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.loaded = false;
    zoom.detach();
    next();
  },
  updated() {
    this.loadedImages = 0;
    [...document.querySelectorAll("[data-zoomable]")].map(img => {
      if (img.complete) this.imageLoaded();
    });
  },
  methods: {
    imageLoaded() {
      this.loadedImages++;
      if (this.loadedImages >= this.$page.gallery.images.length) {
        const gallery = document.querySelector(".gallery");
        masonry = new Masonry(gallery, { gutter: 8 });
        zoom.attach("[data-zoomable]");
        this.$nextTick(() => {
          this.loaded = true;
        });
      }
    }
  }
};
</script>

<style lang="scss">
@import "~/styles/mediaqueries.scss";

.gallery-container {
  max-width: 60rem;
  width: 100%;
  padding: 2rem;
  margin-right: auto;
  margin-left: auto;

  @include min($xs) {
    display: flex;
  }
}

.gallery {
  flex-grow: 1;

  img {
    width: calc(50% - 4px);
    margin-bottom: 8px;
    opacity: 0;
    will-change: opacity;
  }

  &.loaded img {
    transition: opacity 1.5s, transform 0.3s cubic-bezier(0.2, 0, 0.2, 1) !important;
    opacity: 1;

    @for $i from 0 to 20 {
      &:nth-child(#{$i}) {
        transition-delay: 0.05s * $i !important;
      }
    }
  }
}

.gallery-nav {
  @include min($xs) {
    margin-right: 4rem;
  }

  @include max($xs) {
    display: flex;
    justify-content: center;
  }

  a {
    text-decoration: none;

    @include min($xs) {
      display: block;
      margin: 1em auto;
    }

    @include max($xs) {
      margin: 1em;
    }

    &.active {
      text-decoration: underline;
    }
  }
}
</style>
