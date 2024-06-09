<template>

  <DashboardHeader></DashboardHeader>

</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, ref } from "vue";

import DashboardHeader from '@/views/dashboard/DashboardHeader.vue';

export default defineComponent({
  name: "dashboard-main",
  components: {
    DashboardHeader,
  },
  setup() {
    const dashboard = document.querySelector('#dashboard');

    onMounted(() => {
      (dashboard as any).style.display = 'block';
    });

    onBeforeUnmount(() => {
      (dashboard as any).style.display = 'none';
    })

    return {}
  }
});
</script>

<style>
.dashboard {
  margin: 0 auto;
  max-width: 1800px;
  width: 100%;
  padding: 0 40px;
}
.dashboard-stats {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 500px;
}
.dashboard-row {
  display: flex;
  width: 100%;
  gap: 10px;
  margin-top: 12px;
}

@media only screen and (max-width: 1100px) {
  .dashboard {
    padding: 0 10px;
  }

  .dashboard-row {
    display: block;
  }

  .dashboard-stats {
    width: 100%;
    margin-top: 12px;
  }
}
</style>
