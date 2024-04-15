<template>
  <div class="card" :class="widgetClasses">
    <div class="dashboard-chart-card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <div class="card-label fw-bold fs-3 mb-1 mt-3">Financial overview</div>
        <div class="text-muted fw-semibold fs-7 mt-2">{{ getDates }}</div>
      </h3>

      <div class="chart-options">
        <DashboardChartOption @click="setActiveOption('revenue')" :active="activeOption === 'revenue'" label="Revenue" :img="'media/img/chart_revenue.svg'"></DashboardChartOption>
        <DashboardChartOption @click="setActiveOption('cost')" :active="activeOption === 'cost'" label="Costs" :img="'media/img/chart_costs.svg'"></DashboardChartOption>
        <DashboardChartOption @click="setActiveOption('profit')" :active="activeOption === 'profit'" label="Profit" :img="'media/img/chart_profit.svg'"></DashboardChartOption>
      </div>
    </div>

    <div class="chart-filters__container">
      <div class="card-toolbar chart-filters">
        <div class="chart-currencies">
          <div v-for="(item, index) in currencies" :key="index" class="button-primary" @click="setCurrency(item)" :class="{'active': currency === item}">{{ item }}</div>
        </div>

        <div class="chart-times">
          <div class="button-primary" @click="setTimeMode('yearly')" :class="{'active': timeMode === 'yearly'}">Year</div>
          <div class="button-primary" @click="setTimeMode('monthly')" :class="{'active': timeMode === 'monthly'}">Month</div>
          <div class="button-primary" @click="setTimeMode('weekly')" :class="{'active': timeMode === 'weekly'}">Week</div>
          <div class="button-primary" @click="setTimeMode('daily')" :class="{'active': timeMode === 'daily'}">Day</div>
        </div>
      </div>
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
import { computed, defineComponent, onBeforeMount, onMounted, ref, watch } from "vue";
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
    miner: Object,
    startDate: String,
    endDate: String,
  },
  components: { DashboardChartOption },
  setup(props, ctx) {
    const chartRef = ref<typeof VueApexCharts | null>(null);
    const chart = ref<ApexOptions>({});
    const timeMode = ref("yearly");
    const activeOption = ref("revenue");

    const dateRange = ref('');
    const series = ref([]);
    const categories = ref([]);

    const currencies = ref(['USD', 'BTC']);
    const currency = ref('BTC');

    watch(
        () => props.miner,
        (newValue, oldValue) => {
          console.log(newValue, oldValue, ' miner value WATCH')
          fetchChart();
        },
        { deep: true }
    )

    watch(() => currency, () => { fetchChart() }, { deep: true })

    const getDates = computed(() => {
      return moment(props.startDate).format('ll') + ' - ' + moment(props.endDate).format('ll');
    });
    const setTimeMode = (val) => {
      timeMode.value = val;
      fetchChart();
    }

    const setCurrency = (item) => {
      currency.value = item;
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

      const minerValue = props && props.miner && props.miner ? props.miner : null;
      delete minerValue.date_range;
      let body;

      if (minerValue) {
        body = {
          user_id: 0,
          time_mode: timeMode.value,
          currency: currency.value,
          time_filter: {
            start_date: props.startDate,
            end_date: props.endDate
          },
          ...minerValue
        }
      } else {
        body = {
          user_id: 0,
          time_mode: timeMode.value,
          time_filter: {
            start_date: props.startDate,
            end_date: props.endDate
          },
        }
      }

      axios.post(`${host}${endpoint}`, body)
          .then(function (response) {
            setChart(response.data.data);
          })
          .catch(function (error) {
            console.log('Chart Error: ', error);
            // setRandomChart();
          });
    }

    const setRandomChart = () => {
      const mockData = [];
      for(let i = 0; i < 100; i++) {
        mockData.push({
          value: getRandomValue(),
          time: getRandomDateTime()
        })
      }

      setChart(mockData);
    }

    const getRandomValue = () => {
      return Math.floor(Math.random() * (241)) - 120;
    }

    const getRandomDateTime = () => {
      const year = Math.floor(Math.random() * (2025 - 2021)) + 2021;
      const month = Math.floor(Math.random() * 12);
      const day = Math.floor(Math.random() * 31) + 1;
      const hour = Math.floor(Math.random() * 24);
      const minute = Math.floor(Math.random() * 60);
      const second = Math.floor(Math.random() * 60);
      const millisecond = Math.floor(Math.random() * 1000);
      const randomDate = new Date(year, month, day, hour, minute, second, millisecond);
      return randomDate;
    }

    const setChart = (response) => {
      const data = [];
      const offsetData = [];
      categories.value = [];
      response.forEach(item => {
        data.push(Number(item.value));
        offsetData.push(Number(item.value) + Number(item.offset));
        categories.value.push(getCategoryLabel(item.time))
      })

      if ((activeOption.value === 'revenue' && currency.value === 'USD') ||
          (activeOption.value === 'cost' && currency.value === 'BTC') ||
          (activeOption.value === 'profit' && currency.value === 'USD') ||
          (activeOption.value === 'profit' && currency.value === 'BTC')
          ) {
        series.value = [{
          name: capitalizeFirstLetter(activeOption.value),
          data,
          type: 'bar'
        }, {
          name: 'Offset',
          data: offsetData,
          type: 'area'
        }];
      } else {
        series.value = [{
          name: capitalizeFirstLetter(activeOption.value),
          data
        }];
      }

      Object.assign(chart.value, chartOptions());
      refreshChart();
    }

    const getCategoryLabel = (time) => {
      // if (timeMode.value === 'yearly') {
      //   return moment(time).format("YYYY-MM-DDTHH:mm:ss")
      // }
      // if (timeMode.value === 'daily') {
      //   return moment(time).format("HH:mm:ss")
      // }
      // return moment(time).format("DD/MM/YYYY")

      return moment(time).format("YYYY-MM-DDTHH:mm:ss")
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
      const secondaryColor = 'rgba(71 ,95 ,190 , 0.2)';

      return {
        chart: {
          fontFamily: "inherit",
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
          },
          toolbar: {
            show: true,
          },
        },
        plotOptions: {
          bar: {
            colors: {
              ranges: [{
                from: -Infinity,
                to: 0,
                color: '#FF0000'
              }]
            },
            horizontal: false,
            columnWidth: "7px",
            borderRadius: 3,
          },
        },
        legend: {
          show: false,
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          type: 'datetime',
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
            formatter: function (val) {
              return val.toFixed(2);
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
          shared: true,
          intersect: false,
          style: {
            fontSize: "12px",
          },
          y: {
            formatter: function (val) {
              return val.toFixed(5);
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
      setActiveOption,
      currencies,
      currency,
      getDates,
      setCurrency
    };
  },
});
</script>

<style lang="sass">
.dashboard-chart-card-header
  display: flex
  justify-content: space-between
  padding: 0 2.25rem
  border-bottom: 1px solid var(--bs-card-border-color)

.chart-filters
  display: flex
  justify-content: space-between

  .button-primary
    transition: .2s linear

.chart-times
  display: flex

.chart-times .button-primary
  color: #A1A5B7
  background: rgba(241, 241, 242, 1)
  margin-left: 5px

.chart-times .button-primary.active
  color: #fff
  background: #3E97FF

.chart-currencies
  display: flex

.chart-currencies .button-primary
  color: #7E8299
  background: #fff
  margin-left: 5px

.chart-currencies .button-primary.active
  color: #7E8299
  background: #F1F1F2

.chart-options
  display: flex

.chart-filters__container
  padding: 0 2.25rem
  margin-top: 30px


@media only screen and (max-width: 700px)
  .chart-filters__container
    margin-top: 0px

  .dashboard-chart-card-header
    display: block

  .chart-filters
    display: block

  .chart-options, .chart-times, .chart-currencies
    display: block

  .chart-times
    margin-top: 20px

  .chart-times .button-primary, .chart-currencies .button-primary
    margin: 5px 0

</style>
