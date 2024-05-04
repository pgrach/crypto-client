<template>
  <div class="row g-2 g-xl-2">

    <div>
      <DashboardCalculator
          widget-classes="card-xl-stretch"
          :height="330"
          :miner="miner"
          @setMiner="setMiner"
          :loading="loading"
      ></DashboardCalculator>
    </div>

    <div v-show="isCalculated">
      <DashboardTradingAnalysis
          :time-mode="timeMode"
          :miner="miner"
          :start-date="startDate"
          :end-date="endDate"
          :currency="currency"
          @emit-sell-mode="setSellMode"
      ></DashboardTradingAnalysis>
    </div>

    <div v-show="isCalculated" class="col-xl-8">
      <DashboardChart
          widget-classes="card-xl-stretch"
          :height="330"
          :miner="miner"
          :start-date="startDate"
          :end-date="endDate"
          :sell-mode="sellMode"
          @emit-currency="setCurrency"
          @emit-time-mode="setTimeMode"
      ></DashboardChart>
    </div>

    <div v-show="isCalculated" class="col-xl-4 dashboard-stats">
        <DashboardChartStats
            :miner="miner"
            :start-date="startDate"
            :end-date="endDate"
            :time-mode="timeMode"
            :sell-mode="sellMode"
            :currency="currency"
        />

        <DashboardCostBenefitAnalysis
            :miner="miner"
            :start-date="startDate"
            :end-date="endDate"
            :time-mode="timeMode"
            :sell-mode="sellMode"
            :currency="currency"
            class="mb-8"
        />
    </div>
  </div>

<!--  <div class="row g-5 g-xl-8">-->
<!--    <div>-->
<!--      <TradeHistory></TradeHistory>-->
<!--    </div>-->
<!--  </div>-->

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
import DashboardTradingAnalysis from '@/views/dashboard/components/DashboardTradingAnalysis.vue';

export default defineComponent({
  name: "dashboard-main",
  components: {
    DashboardTradingAnalysis,
    DashboardMarketData,
    TradeHistory,
    DashboardCostBenefitAnalysis,
    DashboardChartStats,
    DashboardChart,
    DashboardCalculator
  },
  setup() {

    const loading = ref(false);
    const isCalculated = ref(false);

    const miner = ref({
      power_cost: 6,
      power: 5000,
      hash_rate : 9380,
      quantity: 10,
      cost_of_hw: 2000
    });

    const timeMode = ref('monthly');
    const sellMode = ref('daily');
    const currency = ref('BTC');

    const startDate = ref(moment('01-01-2019').format("YYYY-MM-DDTHH:mm:ss"));
    const endDate = ref(moment(new Date()).subtract(1, 'days').format("YYYY-MM-DDTHH:mm:ss"));

    const setMiner = (val) => {
      loading.value = true;
      miner.value = val;
      startDate.value = val.startDate;
      endDate.value = val.endDate;
      setTimeout(() => {
        loading.value = false;
        isCalculated.value = true;
      }, 1500)
    }

    const setTimeMode = (val) => {
      timeMode.value = val;
    }

    const setSellMode = (val) => {
      sellMode.value = val;
    }

    const setCurrency = (val) => {
      currency.value = val;
    }

    return {
      setMiner,
      miner,
      startDate,
      endDate,
      timeMode,
      sellMode,
      currency,
      setSellMode,
      setTimeMode,
      setCurrency,
      loading,
      isCalculated
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
