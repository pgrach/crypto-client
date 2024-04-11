<template>
  <div class="card">
    <div class="dashboard-cost-benefit-analysis">
      <div class="dashboard-cost-benefit-analysis__title">Cost-Benefit Analysis</div>

      <div class="dashboard-cost-benefit-analysis-container">
        <DashboardCostBenefitAnalysisItem
            :change="45"
            label="Hardware payback"
            state="up"
            chart-color="rgba(62, 151, 255, 1)"
            back-color="rgba(238, 246, 255, 1)"
        />

        <div class="dashboard-cost-benefit-analysis__line"></div>

        <DashboardCostBenefitAnalysisItem
            :change="60"
            label="Buying vs mining"
            chart-color="rgba(80, 20, 208, 1)"
            back-color="rgba(248, 245, 255, 1)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref, onBeforeMount } from "vue";
import axios from 'axios';
import DashboardCostBenefitAnalysisItem from '@/views/dashboard/components/DashboardCostBenefitAnalysisItem.vue';

export default defineComponent({
  name: "dashboard-cost-benefit-analysis",
  components: {DashboardCostBenefitAnalysisItem},
  setup() {

    const btcPrice = ref(67980.08);
    const volumeBtc = ref(0.17748118);

    onBeforeMount(() => {
      fetchBTCPrice();
    })

    const fetchBTCPrice = () => {
      const api = 'https://api.blockchain.com/v3/exchange/tickers/BTC-USD';

      axios.get(api)
          .then(function (response) {
            btcPrice.value = response?.data?.last_trade_price;
            volumeBtc.value = response?.data?.volume_24h;
          })
          .catch(function (error) {
            console.log('Chart Error: ', error);
          });
    }

    return {
      volumeBtc,
      btcPrice,
      getAssetPath,
    };
  },
});
</script>

<style lang="sass">
.dashboard-cost-benefit-analysis
  padding: 30px 20px

  &__title
    color: #7E8299
    font-size: 18px
    font-weight: 600
    line-height: 18px
    margin-bottom: 30px

  &__line
    border-top: 1px #E1E3EA dotted
    height: 1px
    width: 100%
    margin: 20px 0
</style>

