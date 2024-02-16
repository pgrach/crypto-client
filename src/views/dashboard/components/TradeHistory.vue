<template>
  <div class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Trade history</span>
        <span class="text-muted mt-1 fw-semibold fs-7"
        >Total 424</span
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
                class="table table-row-dashed table-row-gray-200 align-middle gs-0 gy-4 trade-table"
            >
              <!--begin::Table head-->
              <thead>
                <tr class="border-0">
                  <th class="p-0 w-50px"></th>
                  <th class="p-0 min-w-150px"></th>
                  <th class="p-0 min-w-140px"></th>
                  <th class="p-0 min-w-110px"></th>
                  <th class="p-0 min-w-50px"></th>
                </tr>
              </thead>

              <tbody>

              <tr v-for="item in tableData" :key="item.id">
                <td>
                  <div class="trade-table-icon">
                    <img v-if="item.status === 'progress'" :src="getAssetPath('media/img/icon_notification.png')"/>
                    <img v-if="item.status === 'success'" :src="getAssetPath('media/img/icon_notification_inactive.png')"/>
                  </div>
                </td>
                <td>
                  <div class="text-gray-900 fw-bold mb-1 fs-6"
                  >{{ item.title }}</div
                  >
                  <span class="text-muted fw-semibold d-block"
                  >{{ item.description }}</span
                  >
                </td>
                <td class="text-end text-muted fw-semibold">{{ item.info }}</td>
                <td class="text-end">
                  <span class="badge" :class="{'badge-light-danger': item.status === 'progress', 'badge-light-success': item.status === 'success'}">{{ item.status === "progress" ? "In Progress" : "Success"}}</span>
                </td>
                <td class="text-end">
                  <div class="btn btn-sm btn-icon btn-bg-light btn-active-color-primary">
                    <KTIcon icon-name="arrow-right" icon-class="fs-2" />
                  </div>
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
  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "kt-widget-5",
  components: {},
  setup() {

    const tableData = ref([
      {
        id: 1,
        title: "Top Authors",
        description: "Successful Fellas",
        info: "Some",
        status: "progress"
      },
      {
        id: 2,
        title: "Top Authors",
        description: "Successful Fellas",
        info: "Some info",
        status: "progress"
      },
      {
        id: 3,
        title: "New Users",
        description: "Best Customers",
        info: "Some info will",
        status: "success"
      },
      {
        id: 4,
        title: "Active Customers",
        description: "Best Customers",
        info: "Some info will be",
        status: "success"
      },
      {
        id: 5,
        title: "Bestseller Theme",
        description: "Successful Fellas",
        info: "Some info will be here",
        status: "success"
      }
    ])

    return {
      getAssetPath,
      tableData
    };
  },
});
</script>

<style>
.trade-table td, .trade-table table {
  vertical-align: middle;
}
.trade-table-icon img {
  height: 48px;
  width: 48px;
}
</style>
