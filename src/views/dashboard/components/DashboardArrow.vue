<template>
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
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "dashboard-arrow",
  props: {
    state: String
  },
  setup(props, ctx) {
    return {
      props
    }
  }
});
</script>