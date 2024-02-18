<template>
  <div class="card" :class="widgetClasses">
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Deliveries by Category</span>
        <span class="text-muted fw-semibold fs-7 mt-1"
        >Total 424,567 deliveries</span
        >
      </h3>

      <div class="card-toolbar chart-filters">
        <div class="btn me-2" @click="setActiveFilter('year')" :class="{'active': activeFilter === 'year'}">Year</div>
        <div class="btn me-2" @click="setActiveFilter('month')" :class="{'active': activeFilter === 'month'}">Month</div>
        <div class="btn me-2" @click="setActiveFilter('week')" :class="{'active': activeFilter === 'week'}">Week</div>
      </div>
    </div>

    <div class="chart-options">
      <DashboardChartOption :active="true" label="Costs" :img="'media/img/chart_costs.svg'"></DashboardChartOption>
      <DashboardChartOption :active="false" label="Revenue" :img="'media/img/chart_revenue.svg'"></DashboardChartOption>
      <DashboardChartOption :active="true" label="Profit" :img="'media/img/chart_profit.svg'"></DashboardChartOption>
    </div>

    <div class="card-body">
      <apexchart
        ref="chartRef"
        type="bar"
        :options="chart"
        :series="series"
        :height="height"
      ></apexchart>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onBeforeMount, ref } from "vue";
import type { ApexOptions } from "apexcharts";
import { getCSSVariableValue } from "@/assets/ts/_utils";
import type VueApexCharts from "vue3-apexcharts";
import DashboardChartOption from '@/views/dashboard/components/DashboardChartOption.vue';

export default defineComponent({
  name: "dashboard-chart",
  props: {
    widgetClasses: String,
    height: Number,
  },
  components: { DashboardChartOption },
  setup() {
    const chartRef = ref<typeof VueApexCharts | null>(null);
    const chart = ref<ApexOptions>({});
    const activeFilter = ref("year");

    const setActiveFilter = (val) => {
      activeFilter.value = val;
    }

    const series = [
      {
        name: "Costs",
        data: [44, 25, 105, 68, 61, 38, 34, 75, 117, 26, 11, 48],
      },
    ];

    onBeforeMount(() => {
      Object.assign(chart.value, chartOptions());
    });

    const refreshChart = () => {
      if (!chartRef.value) {
        return;
      }

      chartRef.value.updateOptions(chartOptions());
    };

    return {
      chart,
      series,
      chartRef,
      activeFilter,
      getAssetPath,
      setActiveFilter
    };
  },
});

const chartOptions = (): ApexOptions => {
  const labelColor = getCSSVariableValue("--bs-gray-500");
  const borderColor = getCSSVariableValue("--bs-gray-200");
  const baseColor = getCSSVariableValue("--bs-primary");
  const secondaryColor = getCSSVariableValue("--bs-gray-300");

  return {
    chart: {
      fontFamily: "inherit",
      type: "bar",
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "10px",
        borderRadius: 5,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: labelColor,
          fontSize: "12px",
        },
      },
    },
    fill: {
      opacity: 1,
    },
    states: {
      normal: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      hover: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none",
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: "12px",
      },
      y: {
        formatter: function (val) {
          return "$" + val + " thousands";
        },
      },
    },
    colors: [baseColor, secondaryColor],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  };
};
</script>

<style>
.chart-filters .btn {
  padding: 16px 18px;
  font-size: 13px;
  font-weight: 600;
  line-height: 14px;
  word-wrap: break-word;
  background: rgba(241, 241, 242, 1);
  color: #A1A5B7;
  border-radius: 6px;
}
.chart-filters .btn.active {
  color: #fff;
  background: #3E97FF;
}

.chart-options {
  display: flex;
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 0 2.25rem;
}
</style>
