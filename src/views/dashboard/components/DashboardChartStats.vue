<template>
  <div class="dashboard-chart-stats card mb-4">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Mining Financial Summary</span>
        <span class="text-muted mt-1 fw-semibold fs-7">Stats for Selected Period</span>
      </h3>
    </div>
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
                    <DashboardArrow :state="totalSummary.revenue >= 0 ? 'up' : 'down'"></DashboardArrow>
                    <span
                        class="fs-4 fw-bold dashboard-chart-stats-value__margin"
                    >
                      {{ formatCurrency(totalSummary.revenue) }}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="text-gray-600 fw-bold text-hover-primary mb-1 fs-6">Total Costs </div>
                  </td>
                  <td class="text-end dashboard-chart-stats-value">
                    <DashboardArrow :state="totalSummary.cost >= 0 ? 'up' : 'down'"></DashboardArrow>
                    <span
                        class="fs-4 fw-bold dashboard-chart-stats-value__margin"
                    >
                      {{ formatCurrency(totalSummary.cost) }}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="text-gray-600 fw-bold text-hover-primary mb-1 fs-6">Cumulative Net Profit</div>
                  </td>
                  <td class="text-end dashboard-chart-stats-value">
                    <DashboardArrow :state="totalSummary.profit >= 0 ? 'up' : 'down'"></DashboardArrow>
                    <span
                        class="fs-4 fw-bold dashboard-chart-stats-value__margin"
                    >
                      {{ formatCurrency(totalSummary.profit) }}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="text-gray-600 fw-bold text-hover-primary mb-1 fs-6">Average Cost of Production per Bitcoin (USD)</div>
                  </td>
                  <td class="text-end dashboard-chart-stats-value">
                    <DashboardArrow :state="totalSummary.avgCostBtc >= 0 ? 'up' : 'down'"></DashboardArrow>
                    <span
                        class="fs-4 fw-bold dashboard-chart-stats-value__margin"
                    >
                      {{ formatCurrency(totalSummary.avgCostBtc, true) }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, onBeforeMount, ref, watch } from "vue";
import DashboardArrow from "@/views/dashboard/components/DashboardArrow.vue";

export default defineComponent({
  name: "dashboard-chart-stats",
  props: {
    miner: Object,
    totalSummary: Object,
    currency: String,
  },
  components: {
    DashboardArrow
  },
  setup(props, ctx) {
    const formatCurrency = (item, alwaysUsd = false) => {
      if (!alwaysUsd && props.currency === 'BTC') {
        const formatter = new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 6,
          maximumFractionDigits: 6
        });
        return '₿' + formatter.format(item).substring(1);
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
      formatCurrency
    };
  },
});
</script>

<style lang="sass">
.dashboard-chart-stats
  .table.gy-4 th, .table.gy-4 td
    padding: 7px
.dashboard-chart-stats-value
  width: 200px

.dashboard-chart-stats-value__margin
  margin-left: 5px
</style>
