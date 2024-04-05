<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();

const refArticle = ref(null)

const routeToHome = () => {
  router.push({ path: '/' });
}

const routeToArticle = (id, view) => {
  view.scrollIntoView({ behavior: 'instant' });
  router.push({ path: `/articles/${id}` });
}
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
      Job Stories vs. User Stories: The Misguided Debate
    </h1>

    <div class="home-article__author">
      <div class="home-blog-article__author">
        <img class="home-blog-article__author__img" src="../../assets/img/blog-article-author.png" alt="Author">
        <div>Anna Kalinina</div>
        <div class="home-blog-article__author__separator">&#9679;</div>
        <div>6 MAY 2023</div>
      </div>
    </div>

    <div class="home-article__img-container">
      <img class="home-article__img" src="../../assets/img/article-img.png" alt="Main Article Image">
    </div>

    <div class="home-article__content-container">
      <div class="home-article__content">
        However, if you’re a budding student, someone at a startup, agency, consultancy, or simply someone who is not as confident in their career record, your portfolio becomes your beacon.
        It’s a crucial asset that compensates for any uncertainties in your resume or work experience. (Since your portfolio website is one of the few things you have total control over during the job hunting process)
        <br /><br />
        So ask yourself, does your portfolio truly represent your best work? If you’re aiming to make a mark in UX, switch to a dream job, or stand out among thousands vying for highly competitive roles at top companies in 2024, then settling for a ‘good enough’ portfolio isn’t an option.
        Strive for a portfolio that’s undeniably exceptional, one that you’re unequivocally proud of, and don’t stop until you get there.
        <br /><br />
        Don’t: Underestimate the power of a well-crafted portfolio, even at a senior level. Avoid presenting a portfolio that’s merely a checklist of tasks. While it’s not necessary to detail every step of your process, your portfolio should still captivate and inform. Consider adding unique elements that reflect your personality or interests in UX design.
        This could be anything from your involvement in teaching to creating podcasts, participating in design events, or any other aspect that showcases your unique contributions to the field. Make your portfolio a reflection of not just your professional achievements, but also your passion and distinctiveness in the world of UX.
      </div>
    </div>

    <div class="home-article__recommendations">
      <div class="home-article__recommendations__title">Recommended from AiDala</div>

      <div class="home-article__recommendations__articles">

        <div class="home-article__recommendation" @click="routeToArticle(1, refArticle)">
          <img class="home-article__recommendation__img" src="../../assets/img/blog-article.png" alt="Article Image">
          <h2 class="home-article__recommendation__title">16 little UI design rules that make a big impact</h2>
        </div>

        <div class="home-article__recommendation" @click="routeToArticle(2, refArticle)">
          <img class="home-article__recommendation__img" src="../../assets/img/blog-article-2.png" alt="Article Image">
          <h2 class="home-article__recommendation__title">16 little UI design rules that make a big impact</h2>
        </div>

        <div class="home-article__recommendation" @click="routeToArticle(3, refArticle)">
          <img class="home-article__recommendation__img" src="../../assets/img/blog-article-3.png" alt="Article Image">
          <h2 class="home-article__recommendation__title">16 little UI design rules that make a big impact</h2>
        </div>
      </div>
    </div>

    <footer class="home-footer-container">
      <div class="home-footer">
        <div class="home-footer-link">
          AiDala.uk
        </div>
        <div class="home-footer-linkedin">
          <img src="../../assets/img/linkedin_square.svg" alt="Linkedin Image">
        </div>
      </div>
    </footer>
  </div>
</template>
