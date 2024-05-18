<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import axios from 'axios';
import HomeArticle from './components/HomeArticle.vue';
import { articles } from '../article/articles';

const burgerActive = ref(false)
const email = ref('')
const articlesRef = ref([])

onMounted(() => {
  articlesRef.value = articles;
  articlesRef.value.sort((a, b) => b.id - a.id);
})

const activeLink = ref('news');

const router = useRouter();

const routeToHome = () => {
  router.push({ path: "/" });
}
</script>

<template>
  <div class="home">

    <div class="home-nav-burger-container">
      <div class="home-nav-burger" :class="{ 'home-nav-burger_active': burgerActive }" @click="burgerActive = !burgerActive">
        <span class="home-nav-burger-line-1"></span>
        <span class="home-nav-burger-line-2"></span>
        <span class="home-nav-burger-line-3"></span>
      </div>
    </div>

    <Transition>
      <ul v-if="burgerActive" class="home-navigation_mobile">
        <li class="home-nav-mobile" @click="routeToHome()">The AiDala era</li>
        <li class="home-nav-mobile" @click="routeToHome()">Features</li>
        <li class="home-nav-mobile" @click="routeToHome()">Benefits</li>
        <li class="home-nav-mobile" @click="routeToHome()">Join AiDala</li>
        <li class="home-nav-mobile">News</li>
      </ul>
    </Transition>


    <div class="home-gradient">
      <div class="home-gradient__block"></div>
    </div>

    <nav class="home-navigation" data-margin-top="20">
      <ul class="home-navs">
        <li class="home-nav" :class="{ 'home-nav__active': activeLink === 'era' }" @click="routeToHome()">The AiDala era</li>
        <li class="home-nav" :class="{ 'home-nav__active': activeLink === 'features' }" @click="routeToHome()">Features</li>
        <li class="home-nav" :class="{ 'home-nav__active': activeLink === 'benefits' }" @click="routeToHome()">Benefits</li>
        <li class="home-nav" :class="{ 'home-nav__active': activeLink === 'join' }" @click="routeToHome()">Join AiDala</li>
        <li class="home-nav" :class="{ 'home-nav__active': activeLink === 'news' }" @click="routeToHome()">News</li>
      </ul>
    </nav>

    <div class="home-blog">
      <h3 class="home-blog__title">News from AiDala</h3>
      <div class="home-blog__description">
        Revolutionizing Your Crypto Trading Journey. Elevate your strategies, unlock hidden opportunities, and gain a competitive edge with our exclusive features.
      </div>
      <div class="home-blog-articles">
        <HomeArticle
          v-for="item in articlesRef"
          :key="item.id"
          :hash="item.hash"
          :title="item.title"
          :description="item.description"
          :author="item.author"
          :date="item.date"
        >
          <template v-slot:article-img>
            <img class="home-blog-article__img" src="../../assets/img/blog-article.png" alt="Article Img">
          </template>
          <template v-slot:author-img>
            <img class="home-blog-article__author__img" src="../../assets/img/blog-author-pavel.png" alt="Author">
          </template>
        </HomeArticle>

      </div>
    </div>

    <footer class="home-footer-container">
      <div class="home-footer">
        <div class="home-footer-link">
          AiDala.uk
        </div>
        <div class="home-footer-linkedin">
          <a href="https://www.linkedin.com/company/aidala-inc/about/" target="_blank">
            <img src="../../assets/img/linkedin_square.svg" alt="Linkedin Image">
          </a>
        </div>
      </div>
    </footer>
  </div>
</template>
