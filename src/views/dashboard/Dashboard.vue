<template>
  <div class="row g-5 g-xl-8">

    <div class="g-xl-8">
      <DashboardCalculator
          widget-classes="card-xl-stretch"
          :height="330"
          @setMiner="setMiner"
      ></DashboardCalculator>
    </div>

    <div class="col-xl-8">
      <DashboardChart
          widget-classes="card-xl-stretch"
          :height="330"
          :miner="miner"
          :start-date="startDate"
          :end-date="endDate"
      ></DashboardChart>
    </div>

    <div class="col-xl-4 dashboard-stats">
        <DashboardChartStats/>

        <DashboardCostBenefitAnalysis class="mb-8" />
    </div>
  </div>

  <div class="row g-5 g-xl-8">
    <div>
      <TradeHistory></TradeHistory>
    </div>
  </div>

  <DashboardMarketData></DashboardMarketData>

</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import DashboardChart from '@/views/dashboard/components/DashboardChart.vue';
import DashboardChartStats from '@/views/dashboard/components/DashboardChartStats.vue';
import DashboardCostBenefitAnalysis from '@/views/dashboard/components/DashboardCostBenefitAnalysis.vue';
import TradeHistory from '@/views/dashboard/components/TradeHistory.vue';
import DashboardCalculator from '@/views/dashboard/components/DashboardCalculator.vue';
import moment from "moment/moment";
import DashboardMarketData from '@/views/dashboard/components/DashboardMarketData.vue';

export default defineComponent({
  name: "dashboard-main",
  components: {
    DashboardMarketData,
    TradeHistory,
    DashboardCostBenefitAnalysis,
    DashboardChartStats,
    DashboardChart,
    DashboardCalculator
  },
  setup() {

    const miner = ref({
      power_cost: 12,
      power: 5000,
      hash_rate : 9380,
      quantity: 1
    });

    const startDate = ref(moment(new Date()).subtract(7, 'days').format("YYYY-MM-DDTHH:mm:ss"));
    const endDate = ref(moment(new Date()).format("YYYY-MM-DDTHH:mm:ss"));

    const setMiner = (val) => {
      miner.value = val;
      startDate.value = val.date_range[0];
      endDate.value = val.date_range[1];
    }

    return {
      setMiner,
      miner,
      startDate,
      endDate
    }
  }
});
</script>

<style>
.dashboard-stats {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
