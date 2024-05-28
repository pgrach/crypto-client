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

  <DashboardTerms></DashboardTerms>

  <div class="d-flex flex-center flex-wrap px-5">
    <div class="d-flex fw-semibold text-primary fs-base">
      <div class="px-5 cursor-pointer" @click="routeToHome()">Home</div>
      <div class="px-5 cursor-pointer" @click="routeToCalculator()">Dashboard</div>
      <div class="px-5 cursor-pointer" @click="routeToBeta()">Join Beta</div>
    </div>
  </div>
</template>
