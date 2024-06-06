<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
const routeToHome = () => {
  router.push({ path: '/' });
}
</script>

<template>
  <footer class="home-footer-container">
    <div class="home-footer">
      <div @click="routeToHome()" class="home-footer-link">
        AiDala.uk
      </div>
      <div class="home-footer-media__icons">
        <a href="https://www.youtube.com/@Aidala_inc" target="_blank">
          <img src="../../../assets/img/icon_youtube.svg" alt="Youtube Image">
        </a>
        <a href="https://github.com/enterprises/aidala" target="_blank">
          <img src="../../../assets/img/icon_github.svg" alt="Github Image">
        </a>
        <a href="https://x.com/Aidala_inc" target="_blank">
          <img src="../../../assets/img/icon_twitter_x.svg" alt="Twitter X Image">
        </a>
        <a href="https://www.linkedin.com/company/aidala-inc/about/" target="_blank">
          <img src="../../../assets/img/linkedin_square.svg" alt="Linkedin Image">
        </a>
      </div>
    </div>
  </footer>
</template>
