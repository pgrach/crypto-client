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
      $ 51,455.49
    </div>
    <div class="btc-hint">
      change of <span class="text-success">4.94%</span> over the past 24 hours
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";

export default defineComponent({
  name: "dashboard-btc",
  components: {},
  setup() {
    return {
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
