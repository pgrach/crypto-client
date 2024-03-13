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
        <div class="button-primary me-2" @click="setTimeMode('yearly')" :class="{'active': timeMode === 'yearly'}">Year</div>
        <div class="button-primary me-2" @click="setTimeMode('monthly')" :class="{'active': timeMode === 'monthly'}">Month</div>
        <div class="button-primary me-2" @click="setTimeMode('weekly')" :class="{'active': timeMode === 'weekly'}">Week</div>
        <div class="button-primary me-2" @click="setTimeMode('daily')" :class="{'active': timeMode === 'daily'}">Day</div>
<!--        <div>-->
<!--          <el-date-picker-->
<!--              v-model="dateRange"-->
<!--              type="daterange"-->
<!--              range-separator="To"-->
<!--              start-placeholder="Start date"-->
<!--              end-placeholder="End date"-->
<!--          />-->
<!--        </div>-->
      </div>
    </div>

    <div class="chart-options">
      <DashboardChartOption @click="setActiveOption('revenue')" :active="activeOption === 'revenue'" label="Revenue" :img="'media/img/chart_revenue.svg'"></DashboardChartOption>
      <DashboardChartOption @click="setActiveOption('cost')" :active="activeOption === 'cost'" label="Costs" :img="'media/img/chart_costs.svg'"></DashboardChartOption>
      <DashboardChartOption @click="setActiveOption('profit')" :active="activeOption === 'profit'" label="Profit" :img="'media/img/chart_profit.svg'"></DashboardChartOption>
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
import axios from "axios";
import moment from "moment";

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
    const timeMode = ref("yearly");
    const activeOption = ref("revenue");

    const dateRange = ref('');
    const startDate = ref("2024-02-18T16:38:01.294Z");
    const endDate = ref("2024-02-18T16:38:01.294Z");
    const series = ref([])
    const categories = ref([])

    const setTimeMode = (val) => {
      timeMode.value = val;
      fetchChart();
    }

    const setActiveOption = (option) => {
      activeOption.value = option;
      fetchChart();
    }

    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    onBeforeMount(() => {
      fetchChart();
    });

    const fetchChart = () => {
      const host = import.meta.env.VITE_APP_API_HOST;
      const endpoint = activeOption.value;

      const body = {
        user_id: 0,
        time_mode: timeMode.value,
        // time_filter: {
        //   start_date: startDate.value,
        //   end_date: endDate.value
        // }
      }

      axios.post(`${host}${endpoint}`, body)
          .then(function (response) {
            setChart(response.data.data);
          })
          .catch(function (error) {
            console.log('Chart Error: ', error);
          });
    }

    function getRandomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const setChart = (response) => {
      const data = [];
      categories.value = [];
      response.forEach(item => {
        // remove this when MOCKS will be with NEGATIVE values
        if (activeOption.value === 'profit') {
          data.push(getRandomNumber(-130, 130));
        } else {
          data.push(item.value);
        }
        categories.value.push(getCategoryLabel(item.time))
      })

      series.value = [{
        name: capitalizeFirstLetter(activeOption.value),
        data
      }];

      Object.assign(chart.value, chartOptions());
      refreshChart();
    }

    const getCategoryLabel = (time) => {
      if (timeMode.value === 'yearly') {
        return moment(time).format("MMMM")
      }
      if (timeMode.value === 'daily') {
        return moment(time).format("HH:mm:ss")
      }
      return moment(time).format("DD/MM/YYYY")
    }

    const refreshChart = () => {
      if (!chartRef.value) {
        return;
      }

      chartRef.value.updateOptions(chartOptions());
    };

    const chartOptions = (): ApexOptions => {
      const labelColor = getCSSVariableValue("--bs-gray-500");
      const borderColor = getCSSVariableValue("--bs-gray-200");
      const baseColor = activeOption.value === 'cost' ? 'rgba(233, 181, 0, 1)' :
                        activeOption.value === 'profit' ? 'rgba(71, 190, 125, 1)' : getCSSVariableValue("--bs-primary");
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
            colors: {
              ranges: [{
                from: -100000,
                to: 0,
                color: '#FF0000'
              }]
            },
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
          categories: categories.value,
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
              return val.toString();;
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

    return {
      dateRange,
      chart,
      series,
      chartRef,
      timeMode,
      activeOption,
      getAssetPath,
      setTimeMode,
      setActiveOption
    };
  },
});
</script>

<style>
.chart-filters .button-primary {
  color: #A1A5B7;
  background: rgba(241, 241, 242, 1);
}
.chart-filters .button-primary.active {
  color: #fff;
  background: #3E97FF;
}

.chart-options {
  display: flex;
  margin-top: 10px;
  padding: 0 2.25rem;
}
</style>
