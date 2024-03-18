<template>
  <div class="card p-8">
    <!--begin::Header-->
    <div class="d-flex justify-content-start align-items-center border-0">
      <img
          alt="Logo"
          :src="getAssetPath('media/img/btc.png')"
          class="btc-logo"
      />
      <p class="text-gray-600 fw-bold fs-3 ms-7">
        Bitcoin Price(BTC)
      </p>
    </div>
    <div class="btc-price">
      $ {{ btcPrice }}
    </div>
    <div class="btc-hint">
      change of <span class="text-success">{{ volumeBtc.toFixed(2) }}%</span> over the past 24 hours
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref, onBeforeMount } from "vue";
import axios from 'axios';

export default defineComponent({
  name: "dashboard-btc",
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
            btcPrice.value = response?.data?.price_24h;
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
.btc

  &-logo
    width: 48px
    height: auto

  &-price
    margin-top: 30px
    font-size: 34px
    color: #000
    font-weight: 600
    line-height: 34px

  &-hint
    margin-top: 30px
    color: #A1A5B7
    font-size: 14px
    font-weight: 600
    line-height: 14px
</style>
