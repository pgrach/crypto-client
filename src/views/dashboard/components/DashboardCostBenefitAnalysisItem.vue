<template>
  <div class="cost-benefits-item">
    <div class="cost-benefits-item__options">
      <div  class="cost-benefits-item__options__change">
        <KTIcon
            v-if="props.state === 'up'"
            icon-name="arrow-up"
            icon-class="fs-3 text-success"
        />
        <KTIcon
            v-else
            icon-name="arrow-down"
            icon-class="fs-3 text-danger"
        />
        <span class="cost-benefits-item__options__change__value">{{ props.change }}%</span>
      </div>
      <div class="cost-benefits-item__options__label">
        {{ props.label }}
      </div>
    </div>
    <div class="cost-benefits-item__chart"></div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent } from "vue";

export default defineComponent({
  name: "dashboard-cost-benefit-analysis-item",
  props: {
    change: Number,
    label: String,
    state: String
  },
  components: {},
  setup(props, ctx) {


    return {
      props,
      getAssetPath,
    };
  },
});
</script>

<style lang="sass">
.cost-benefits-item
  display: flex

  &__options
    padding: 10px
    box-sizing: border-box
    border: 1px #E1E3EA dotted
    width: 200px

    &__change
      color: #181C32
      font-size: 16px
      font-weight: 600
      line-height: 16px

      &__value
        margin-left: 7px

    &__label
      color: #A1A5B7
      font-size: 12px
      font-weight: 600
      line-height: 12px
      margin-top: 7px

  &__chart
    width: 50%
</style>
