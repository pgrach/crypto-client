<template>
  <!--begin::Dashboard-->
  <div class="row g-5 g-xl-8">
    <div class="col-xl-8">
      <DashboardChart
          widget-classes="card-xl-stretch mb-xl-8"
          :height="400"
      ></DashboardChart>
    </div>

    <div class="col-xl-4">
      <div class="d-flex flex-column flex-fill align-content-between">
          <DashboardChartStats/>

          <DashboardBtc />
      </div>
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
