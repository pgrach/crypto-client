<template>
  <div class="card mb-4">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Mining Financial Summary</span>
        <span class="text-muted mt-1 fw-semibold fs-7"
          >Stats for Selected Period</span
        >
      </h3>
    </div>
    <!--end::Header-->
    <!--begin::Body-->
    <div class="card-body py-3">
      <div class="tab-content">
        <!--begin::Tap pane-->
        <div class="tab-pane fade active show" id="kt_table_widget_5_tab_1">
          <!--begin::Table container-->
          <div class="table-responsive">
            <!--begin::Table-->
            <table
              class="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4"
            >
              <!--begin::Table head-->
              <thead>
                <tr class="border-0">
                  <th class="p-0 min-w-150px"></th>
                  <th class="p-0 min-w-140px"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div class="text-gray-600 fw-bold text-hover-primary mb-1 fs-6">Total Revenue</div>
                  </td>
                  <td class="text-end dashboard-chart-stats-value">
                    <DashboardArrow :state="totalRevenue >= 0 ? 'up' : 'down'"></DashboardArrow>
                    <span
                        class="fs-4 fw-bold dashboard-chart-stats-value__margin"
                    >
                      {{ formatCurrency(totalRevenue) }}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="text-gray-600 fw-bold text-hover-primary mb-1 fs-6">Total Costs </div>
                  </td>
                  <td class="text-end dashboard-chart-stats-value">
                    <DashboardArrow :state="totalCosts >= 0 ? 'up' : 'down'"></DashboardArrow>
                    <span
                        class="fs-4 fw-bold dashboard-chart-stats-value__margin"
                    >
                      {{ formatCurrency(totalCosts) }}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="text-gray-600 fw-bold text-hover-primary mb-1 fs-6">Cumulative Net Profit</div>
                  </td>
                  <td class="text-end dashboard-chart-stats-value">
                    <DashboardArrow :state="totalProfit >= 0 ? 'up' : 'down'"></DashboardArrow>
                    <span
                        class="fs-4 fw-bold dashboard-chart-stats-value__margin"
                    >
                      {{ formatCurrency(totalProfit) }}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="text-gray-600 fw-bold text-hover-primary mb-1 fs-6">Average Cost of Production per Bitcoin (USD)</div>
                  </td>
                  <td class="text-end dashboard-chart-stats-value">
                    <DashboardArrow :state="averageCost >= 0 ? 'up' : 'down'"></DashboardArrow>
                    <span
                        class="fs-4 fw-bold dashboard-chart-stats-value__margin"
                    >
                      {{ formatCurrency(averageCost) }}
                    </span>
                  </td>
                </tr>
              </tbody>
              <!--end::Table body-->
            </table>
          </div>
          <!--end::Table-->
        </div>
      </div>
    </div>
    <!--end::Body-->
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onBeforeMount, ref, watch } from "vue";
import DashboardArrow from "@/views/dashboard/components/DashboardArrow.vue";
import moment from 'moment';
import axios from 'axios';

export default defineComponent({
  name: "dashboard-chart-stats",
  props: {
    miner: Object,
    startDate: String,
    endDate: String,
    timeMode: String,
    sellMode: String,
    currency: String,
  },
  components: {
    DashboardArrow
  },
  setup(props, ctx) {

    const totalRevenue = ref(0);
    const totalCosts = ref(0);
    const totalProfit = ref(0);
    const averageCost = ref(0);

    onBeforeMount(() => {
      fetchSummary();
    })

    watch(
        () => props.miner,
        (newValue, oldValue) => {
          fetchSummary();
        },
        { deep: true }
    )

    watch(
        () => props.timeMode,
        (newValue, oldValue) => {
          fetchSummary();
        },
        { deep: true }
    )

    watch(
        () => props.sellMode,
        (newValue, oldValue) => {
          fetchSummary();
        },
        { deep: true }
    )

    const fetchSummary = () => {
      if (props.timeMode === "daily" && props.sellMode === "monthly") {
        return;
      }
      const host = import.meta.env.VITE_APP_API_HOST;
      const endpoint = 'summary';

      const minerValue = props && props.miner && props.miner ? props.miner : null;
      let body;

      if (minerValue) {
        body = {
          user_id: 0,
          time_mode: props.timeMode,
          sell_mode: props.sellMode,
          currency: props.currency,
          time_filter: {
            start_date: moment(props.startDate).format("YYYY-MM-DDTHH:mm:ss"),
            end_date: moment(props.endDate).format("YYYY-MM-DDTHH:mm:ss")
          },
          cost_of_hw: minerValue.cost_of_hw,
          hash_rate: minerValue.hash_rate,
          power: minerValue.power,
          power_cost: minerValue.power_cost,
          quantity: minerValue.quantity
        }
      }

      axios.post(`${host}${endpoint}`, body)
          .then(function (response) {
            totalRevenue.value = response?.data?.total_rev_usd ? response.data.total_rev_usd : 0;
            totalCosts.value = response?.data?.total_cost_usd ? response.data.total_cost_usd : 0;
            totalProfit.value = response?.data?.total_profit_usd ? response.data.total_profit_usd : 0;
            averageCost.value = response?.data?.avg_cost_per_btc ? response.data.avg_cost_per_btc : 0;
          })
          .catch(function (error) {
            console.log('Chart Error: ', error);
            // setRandomChart();
          });
    }

    const formatCurrency = (item) => {
      if (props.currency === 'BTC') {
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 6,
          maximumFractionDigits: 6
        });
        return formatter.format(item)
      } else {
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2
        });
        return formatter.format(item)
      }
    }

    return {
      getAssetPath,
      totalRevenue,
      totalCosts,
      totalProfit,
      averageCost,
      formatCurrency
    };
  },
});
</script>

<style lang="sass">
.dashboard-chart-stats-value
  width: 200px

.dashboard-chart-stats-value__margin
  margin-left: 5px
</style>
