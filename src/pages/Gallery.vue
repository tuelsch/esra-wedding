<template>
  <div class="gallery">
    <nav>
      <a
        :href="category.href"
        v-for="category in categories"
        :key="category.title"
      >{{category.title}}</a>
    </nav>
  </div>
</template>