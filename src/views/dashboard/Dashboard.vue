<template>
  <!--begin::Dashboard-->
  <div class="row g-5 g-xl-8">
    <div class="col-xl-8">
      <DashboardChart
          widget-classes="card-xl-stretch"
          :height="330"
      ></DashboardChart>
    </div>

    <div class="col-xl-4 dashboard-stats">
        <DashboardChartStats/>

        <DashboardBtc class="mb-8" />
    </div>
  </div>

  <div class="row g-5 g-xl-8">
    <div>
      <TradeHistory></TradeHistory>
    </div>
  </div>

</template>

<script lang="ts">
import { defineComponent } from "vue";
import DashboardChart from '@/views/dashboard/components/DashboardChart.vue';
import DashboardChartStats from '@/views/dashboard/components/DashboardChartStats.vue';
import DashboardBtc from '@/views/dashboard/components/DashboardBtc.vue';
import TradeHistory from '@/views/dashboard/components/TradeHistory.vue';

export default defineComponent({
  name: "dashboard-main",
  components: {
    TradeHistory,
    DashboardBtc,
    DashboardChartStats,
    DashboardChart
  },
});
</script>

<style>
.dashboard-stats {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
