<template>
  <div class="card">
    <div class="dashboard-cost-benefit-analysis">
      <div class="dashboard-cost-benefit-analysis__title">Cost-Benefit Analysis</div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref, onBeforeMount } from "vue";
import axios from 'axios';

export default defineComponent({
  name: "dashboard-cost-benefit-analysis",
  components: {},
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

  &__title
    color: #7E8299
    font-size: 18px
    font-weight: 600
    line-height: 18px
</style>
