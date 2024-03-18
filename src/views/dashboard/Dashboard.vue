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
import { defineComponent, reactive, ref } from "vue";
import DashboardChart from '@/views/dashboard/components/DashboardChart.vue';
import DashboardChartStats from '@/views/dashboard/components/DashboardChartStats.vue';
import DashboardBtc from '@/views/dashboard/components/DashboardBtc.vue';
import TradeHistory from '@/views/dashboard/components/TradeHistory.vue';
import DashboardCalculator from '@/views/dashboard/components/DashboardCalculator.vue';

export default defineComponent({
  name: "dashboard-main",
  components: {
    TradeHistory,
    DashboardBtc,
    DashboardChartStats,
    DashboardChart,
    DashboardCalculator
  },
  setup() {

    const miner = ref({
      block_reward : 6.25,
      power_cost: 12,
      power: 5000,
      hash_rate : 9380,
      quantity: 1
    });

    const setMiner = (val) => {
      miner.value = val;
    }

    return {
      setMiner,
      miner
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
