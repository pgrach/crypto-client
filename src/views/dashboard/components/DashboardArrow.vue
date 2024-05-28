<template>
  <img
      v-if="props.state === 'up'"
      :src="getAssetPath('media/img/arrow-up.svg')"
  />
  <img
      v-else
      :src="getAssetPath('media/img/arrow-down.svg')"
  />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { getAssetPath } from '@/core/helpers/assets';

export default defineComponent({
  name: "dashboard-arrow",
  methods: {getAssetPath},
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
