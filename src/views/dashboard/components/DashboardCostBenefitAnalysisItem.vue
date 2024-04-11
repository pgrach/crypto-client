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
    <div class="cost-benefits-item__chart">
      <apexchart
          ref="chartRef"
          class="mixed-widget-4-chart"
          :options="chart"
          :series="series"
          :height="chartHeight"
          type="radialBar"
      ></apexchart>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { computed, defineComponent, onBeforeMount, ref, watch } from "vue";
import type VueApexCharts from 'vue3-apexcharts';
import type { ApexOptions } from 'apexcharts';
import { useThemeStore } from '@/stores/theme';

export default defineComponent({
  name: "dashboard-cost-benefit-analysis-item",
  props: {
    change: Number,
    label: String,
    state: String,
    chartColor: String,
    backColor: String,
  },
  components: {},
  setup(props, ctx) {

    const chartRef = ref<typeof VueApexCharts | null>(null);
    const chart = ref<ApexOptions>({});
    const store = useThemeStore();
    const chartHeight = 170;

    const series = ref([props.change]);

    const themeMode = computed(() => {
      return store.mode;
    });

    onBeforeMount(() => {
      Object.assign(
          chart.value,
          chartOptions(props.chartColor, chartHeight)
      );
    });

    const refreshChart = () => {
      if (!chartRef.value) {
        return;
      }

      chartRef.value.updateOptions(
          chartOptions(props.chartColor, chartHeight)
      );
    };

    watch(themeMode, () => {
      refreshChart();
    });

    const chartOptions = (
        color: string = "primary",
        height: string = "auto"
    ): ApexOptions => {
      const chartColor = props.chartColor;
      const backColor = props.backColor;

      return {
        chart: {
          fontFamily: "inherit",
          height: height,
          type: "radialBar",
        },
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            hollow: {
              size: '65%',
            },
            track: {
              background: backColor,
            },
            dataLabels: {
              name: {
                show: false
              },
              value: {
                offsetY: -2,
                fontSize: '20px',
                fontWeight: 600,
              }
            }
          }
        },
        grid: {
          padding: {
            top: -10
          }
        },
        colors: [chartColor],
        stroke: {
          lineCap: "round",
        },
        labels: ["Progress"],
      };
    };

    return {
      props,
      getAssetPath,
      chart,
      series,
      chartRef,
      chartHeight
    };
  },
});
</script>

<style lang="sass">
.cost-benefits-item
  display: flex
  height: 80px
  justify-content: space-between

  &__options
    margin-top: 8px
    padding: 10px 10px
    box-sizing: border-box
    border: 1px #E1E3EA dotted
    width: 130px
    height: 60px

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
    overflow: hidden
</style>
