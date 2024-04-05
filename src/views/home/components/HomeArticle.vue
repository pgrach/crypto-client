<script setup>
const props = defineProps({
  imgSrc: String,
  title: String,
  description: String,
  author: String,
  imgAuthor: String,
  date: String
});
</script>

<template>
  <article class="home-blog-article">
    <slot name="article-img"></slot>
    <div class="home-blog-article__content">
      <div>
        <h4 class="home-blog-article__title">{{ props.title }}</h4>
        <div class="home-blog-article__description">{{ props.description }}</div>
        <div class="home-blog-article__author">
          <slot name="author-img"></slot>
          <div>{{ props.author }}</div>
          <div class="home-blog-article__author__separator">&#9679;</div>
          <div>{{ props.date }}</div>
        </div>
      </div>
    </div>
  </article>
</template>
