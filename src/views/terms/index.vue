<script setup>
import { useRouter } from 'vue-router';
import DashboardHeader from "@/views/dashboard/DashboardHeader.vue";
import DashboardTerms from "@/views/terms/terms.vue";

const router = useRouter();

const goBack = () => {
  router.go(-1)
}

const routeToHome = () => {
  router.push({ path: "/" });
}

const routeToCalculator = () => {
  router.push({ path: "/dashboard" });
}

const routeToBeta = () => {
  router.push({ path: "/access-form" });
}
</script>

<template>
  <DashboardHeader></DashboardHeader>

  <div class="terms-privacy">
    <DashboardTerms></DashboardTerms>
  </div>


  <div class="d-flex flex-center flex-wrap px-5">
    <div class="d-flex fw-semibold text-primary fs-base">
      <div class="px-5 cursor-pointer" @click="routeToHome()">Home</div>
      <div class="px-5 cursor-pointer" @click="routeToCalculator()">Dashboard</div>
      <div class="px-5 cursor-pointer" @click="routeToBeta()">Join Beta</div>
    </div>
  </div>
</template>

<style lang="sass">
.terms-privacy
  margin: 20px 0
  width: 100%

  border-radius: 10px
  padding: 0 50px
  box-sizing: border-box

  @media only screen and (max-width: 700px)
    padding: 10px
</style>
