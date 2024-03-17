import { ref } from "vue";
import { defineStore } from "pinia";

export const useDashboardStore = defineStore("dashboard", () => {
  const miner = ref<any>({});

  function getMiner() {
    return miner;
  }

  function setMiner(miner) {
    miner.value = miner;
  }

  return {
    getMiner,
    setMiner
  };
});
