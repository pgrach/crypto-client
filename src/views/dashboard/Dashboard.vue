<template>

  <DashboardHeader></DashboardHeader>

  <div class="dashboard">

    <div class="dashboard-row">
      <DashboardCalculator
          widget-classes="card-xl-stretch"
          :height="330"
          :miner="miner"
          @setMiner="setMiner"
          :loading="loading"
      ></DashboardCalculator>

      <DashboardTradingAnalysis
          :time-mode="timeMode"
          :miner="miner"
          :start-date="startDate"
          :end-date="endDate"
          :currency="currency"
          @emit-sell-mode="setSellMode"
      ></DashboardTradingAnalysis>
    </div>

    <div>
      <div class="dashboard-row">
        <DashboardChart
            :height="330"
            :miner="miner"
            :start-date="startDate"
            :end-date="endDate"
            :sell-mode="sellMode"
            @emit-currency="setCurrency"
            @emit-time-mode="setTimeMode"
        ></DashboardChart>

        <div>
          <div class="dashboard-stats">
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
            />
          </div>
        </div>

      </div>
    </div>

    <DashboardMarketData></DashboardMarketData>

  </div>
<!--  <div class="row g-5 g-xl-8">-->
<!--    <div>-->
<!--      <TradeHistory></TradeHistory>-->
<!--    </div>-->
<!--  </div>-->
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
import DashboardHeader from '@/views/dashboard/DashboardHeader.vue';

export default defineComponent({
  name: "dashboard-main",
  components: {
    DashboardTradingAnalysis,
    DashboardMarketData,
    DashboardHeader,
    DashboardCostBenefitAnalysis,
    DashboardChartStats,
    DashboardChart,
    DashboardCalculator
  },
  setup() {

    const loading = ref(false);
    const isCalculated = ref(false);

    const miner = ref({
      power_cost: 5.5,
      power: 3348,
      hash_rate : 62,
      quantity: 10,
      cost_of_hw: 500
    });

    const timeMode = ref('monthly');
    const sellMode = ref('daily');
    const currency = ref('BTC');

    const startDate = ref(moment('2023-01-01', 'YYYY-MM-DD').format("YYYY-MM-DDTHH:mm:ss"));
    const endDate = ref(moment('2024-01-01', 'YYYY-MM-DD').format("YYYY-MM-DDTHH:mm:ss"));

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
.dashboard {
  margin: 0 auto;
  max-width: 1800px;
  width: 100%;
  padding: 0 40px;
}
.dashboard-stats {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 500px;
}
.dashboard-row {
  display: flex;
  width: 100%;
  gap: 10px;
  margin-top: 12px;
}

@media only screen and (max-width: 1100px) {
  .dashboard {
    padding: 0 10px;
  }

  .dashboard-row {
    display: block;
  }

  .dashboard-stats {
    width: 100%;
    margin-top: 12px;
  }
}
</style>
