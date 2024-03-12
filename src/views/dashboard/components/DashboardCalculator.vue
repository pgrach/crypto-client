<template>
  <div class="card dashboard-calculator" :class="widgetClasses">
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Calculator</span>
      </h3>

      <div>
        <button class="button-primary" @click="calculate()">Calculate</button>
      </div>

    </div>

    <div class="card-body">
      123
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from "vue";

export default defineComponent({
  name: "dashboard-calculator",
  props: {
    widgetClasses: String,
    height: Number,
  },
  setup() {

    const calculate = () => {
      console.log('calculate')
    }

    return {
      calculate
    };
  },
});
</script>

<style>

</style>
