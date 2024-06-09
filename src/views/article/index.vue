<script setup>
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, watch, computed } from "vue";
import Footer from "@/views/components/footer/index.vue"
import { articles } from "./articles";

const router = useRouter();

const article = ref();
const hashId = ref();

const refArticle = ref(null)

const route = useRoute();
const routeToHome = () => {
  router.push({ path: '/' });
}

onMounted(() => {
  setArticle();
})


watch(
    () => route.params.hash,
    (newValue, oldValue) => {
      setArticle();
    },
    { deep: true }
)

const setArticle = () => {
  article.value = articles.find(item => item.hash == route.params.hash)
}

const routeToArticle = (hash, view) => {
  view.scrollIntoView({ behavior: 'instant' });
  router.push({ path: `/articles/${hash}` });
}

const recommendedArticles = computed(() => {
  const recommended = articles.filter(item => item.hash !== route.params.hash);
  // recommended.sort((a, b) => b.id - a.id);
  return recommended.slice(0, 3);
})
</script>

<template>
  <div class="home home-article">
    <div class="home-gradient">
      <div class="home-gradient__block"></div>
    </div>

    <div class="home-logo cursor-pointer" @click="routeToHome()" ref="refArticle">
      <img src="../../assets/img/logo_aidala.svg" alt="AiDala Logo">
    </div>

    <h1 class="home-article__title">
      {{ article?.title }}
    </h1>

    <div class="home-article__author">
      <div class="home-blog-article__author">
        <img class="home-blog-article__author__img" src="../../assets/img/blog-author-pavel.png" alt="Author">
        <div>{{ article?.author }}</div>
        <div class="home-blog-article__author__separator">&#9679;</div>
        <div>{{ article?.date }}</div>
      </div>
    </div>

    <div class="home-article__img-container">
      <img class="home-article__img" :src="article?.imgMain" alt="Main Article Image">
    </div>

    <div class="home-article__content-container">
      <div class="home-article__content" v-html="article?.content">
      </div>
    </div>

    <div class="home-article__recommendations">
      <div class="home-article__recommendations__title">Recommended from AiDala</div>

      <div class="home-article__recommendations__articles">

        <div v-for="item in recommendedArticles" class="home-article__recommendation" @click="routeToArticle(item.hash, refArticle)" :key="item.id">
          <img class="home-article__recommendation__img" :src="item.img" alt="Article Image">
          <h2 class="home-article__recommendation__title">{{ item.title }}</h2>
        </div>

      </div>
    </div>

    <Footer></Footer>
  </div>
</template>
