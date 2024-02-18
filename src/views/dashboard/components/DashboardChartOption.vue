<template>
  <div class="chart-option" :class="{ 'chart-option__active': active }">
    <div class="chart-option__img">
      <img :src="getAssetPath(img)"/>
    </div>
    <div class="chart-option__label">{{ label }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getAssetPath } from "@/core/helpers/assets";

export default defineComponent({
  name: "dashboard-chart-option",
  props: {
    label: String,
    img: String,
    active: Boolean
  },
  components: {},
  setup() {
    return {
      getAssetPath
    };
  },
});
</script>

<style>
.chart-option {
  border: 1px solid rgba(225, 227, 234, 1);
  box-sizing: border-box;
  padding: 15px 5px 20px;
  border-radius: 15px;
  position: relative;
  cursor: pointer;
  width: 87px;
  margin-right: 20px;
}
.chart-option::after {
  position: absolute;
  content: '';
  width: calc(100% - 12px);
  height: 3px;
  bottom: -2px;
  left: 6px;
  background: rgba(62, 151, 255, 0);
  border-radius: 15px;
  transition: .3s linear;
}
.chart-option.chart-option__active::after {
  bottom: 0px;
  background: rgba(62, 151, 255, 1);
}
.chart-option__img {
  display: flex;
  justify-content: center;
}
.chart-option__label {
  color: #3F4254;
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;
  margin-top: 7px;
  text-align: center;
}
</style>
