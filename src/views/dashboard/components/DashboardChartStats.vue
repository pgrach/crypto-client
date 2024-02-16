<template>
  <div class="card">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Highlights on chart</span>
        <span class="text-muted mt-1 fw-semibold fs-7"
          >Latest social statistics</span
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
                    <div class="text-gray-600 fw-bold text-hover-primary mb-1 fs-6">Sum of costs</div>
                  </td>
                  <td class="text-end">
                    <KTIcon
                        icon-name="arrow-up"
                        icon-class="fs-3 text-success"
                    />
                    <span
                        class="fs-4 fw-bold"
                    >
                      55,700
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="text-gray-600 fw-bold text-hover-primary mb-1 fs-6">Margin %</div>
                  </td>
                  <td class="text-end">
                    <KTIcon
                        icon-name="arrow-up"
                        icon-class="fs-3 text-success"
                    />
                    <span class="fs-4 fw-bold">
                      7.8
                    </span>
                    <span class="fs-4 text-gray-600 fw-bold">/ 10</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="text-gray-600 fw-bold text-hover-primary mb-1 fs-6">***</div>
                  </td>
                  <td class="text-end">
                    <KTIcon
                        icon-name="arrow-down"
                        icon-class="fs-3 text-danger"
                    />
                    <span
                        class="fs-4 fw-bold"
                    >
                      730k
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="text-gray-600 fw-bold text-hover-primary mb-1 fs-6">****</div>
                  </td>
                  <td class="text-end">
                    <KTIcon
                        icon-name="arrow-up"
                        icon-class="fs-3 text-success"
                    />
                    <span
                        class="fs-4 fw-bold"
                    >
                      2.09$
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
import { defineComponent } from "vue";

export default defineComponent({
  name: "dashboard-chart-stats",
  components: {},
  setup() {
    return {
      getAssetPath,
    };
  },
});
</script>
