<template>
  <div class="card dashboard-calculator" :class="widgetClasses">
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Historical Calculation</span>
      </h3>

    </div>

    <div class="card-body">

      <div class="dashboard-calculator-form">
        <div class="dashboard-calculator-form__item">
          <div class="label">Model</div>

          <el-select v-model="miner" @change="setMinerData()" aria-label="Select miner name" value-key="id"
          :loading="loadingMiners"
          :disabled="loadingMiners"
          filterable  
          :filter-method="filterMiners"
          placeholder="Type to search..."
          >
            <el-option v-for="item in filteredMiners" :value="item" :label="item.miner_name" :key="item.id">{{ item?.miner_name }}</el-option>
          </el-select>
          <p v-if="minerError" class="error-message">Failed to load miners. Please try again.</p>

        </div>

        <div class="dashboard-calculator-form__item">
          <div class="label">Quantity</div>

          <el-input-number v-model="quantity" :min="1" placeholder="Quantity" />
        </div>

        <div class="dashboard-calculator-form__item">
          <div class="label">Hashrate (TH/s)</div>

          <el-input-number v-model="hashrate" :min="1" placeholder="Hashrate (TH/s)" />
        </div>

        <div class="dashboard-calculator-form__item">
          <div class="label">Power (W)</div>

          <el-input-number v-model="power" :min="1" placeholder="Power (W)" />
        </div>

        <div class="dashboard-calculator-form__item">
          <div class="label">Energy Cost (cents per kWh)</div>

          <el-input-number v-model="powerCost" :min="0" :step="0.1" placeholder="Energy Cost (cents per kWh)" />
        </div>

        <div class="dashboard-calculator-form__item">
          <div class="label">Cost of hardware ($ per unit)</div>

          <el-input-number v-model="costOfHw" :min="1" placeholder="Cost of hardware ($)" />
        </div>

        <div class="dashboard-calculator-form__item">
          <div class="label">Start Date</div>
          <el-date-picker v-model="startDate"></el-date-picker>
        </div>

        <div class="dashboard-calculator-form__item">
          <div class="label">End Date</div>
          <el-date-picker v-model="endDate"></el-date-picker>
        </div>

        <div class="dashboard-calculator-form__item">
          <div class="label"></div>

          <button class="button-primary button-primary__loader"
                  :class="{'button-primary__loader_loading': loading}"
                  :disabled="loading" @click="emitMiner()">
              <span class="button-primary__loader__label">
                Calculate
              </span>
            <span v-if="loading"
                  class="spinner-border spinner-border-sm loader-left">
              </span>
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref, watch } from "vue";
import { ErrorMessage, Field, Form as VForm } from 'vee-validate';
import axios from 'axios';
import moment from "moment";
import { start } from '@popperjs/core';
import { watchDebounced } from '@vueuse/core'

export default defineComponent({
  name: "dashboard-calculator",
  methods: {
    start() {
      return start
    }
  },
  props: {
    widgetClasses: String,
    height: Number,
    loading: Boolean,
  },
  components: {
    Field,
  },
  emits: ['setMiner'],
  setup(props, ctx) {
    const miners = ref([]);
    const filteredMiners = ref([]);
    const miner = ref({ id: '4f75b5a5-4187-412f-ad50-0c2533cba001', miner_name: 'Whatsminer M32', hashrate: 62, power: 3348 });
    const quantity = ref(10);
    const hashrate = ref(62);
    const power = ref(3348);
    const powerCost = ref(5.5);
    const costOfHw = ref(500);
    const startDate = ref(moment('2023-01-01', 'YYYY-MM-DD').toDate());
    const endDate = ref(moment('2024-01-01', 'YYYY-MM-DD').toDate());
    const searchQuery = ref("");

    const setMinerData = () => {
      hashrate.value = miner.value.hashrate;
      power.value = miner.value.power;
    }

    watchDebounced(
        () => quantity,
        (newValue, oldValue) => {
          emitMiner();
        },
        { deep: true, debounce: 500, maxWait: 1000 }
    )

    watchDebounced(
        () => hashrate,
        (newValue, oldValue) => {
          emitMiner();
        },
        { deep: true, debounce: 500, maxWait: 1000 }
    )

    watchDebounced(
        () => power,
        (newValue, oldValue) => {
          emitMiner();
        },
        { deep: true, debounce: 500, maxWait: 1000 }
    )

    watchDebounced(
        () => powerCost,
        (newValue, oldValue) => {
          emitMiner();
        },
        { deep: true, debounce: 500, maxWait: 1000 }
    )

    watchDebounced(
        () => costOfHw,
        (newValue, oldValue) => {
          emitMiner();
        },
        { deep: true, debounce: 500, maxWait: 1000 }
    )

    const filterMiners = (query: string) => {
      if (query === '') {
        filteredMiners.value = miners.value;
      } else {
        filteredMiners.value = miners.value.filter(miner => 
          miner.miner_name.toLowerCase().includes(query.toLowerCase())
        );
      }
    };

    const emitMiner = () => {
      const minerData = {
        startDate: startDate.value,
        endDate: endDate.value,
        power_cost: powerCost.value,
        power: power.value,
        hash_rate : hashrate.value,
        quantity: quantity.value,
        cost_of_hw: costOfHw.value
      }
      ctx.emit('setMiner', minerData);
    }

    onBeforeMount(() => {
      fetchFormData();
    });

    const fetchFormData = () => {
      const host = import.meta.env.VITE_APP_API_HOST;
      loadingMiners.value = true;
      minerError.value = false;

      axios.get(`${host}asics`)
          .then(function (response) {
            miners.value = response && response.data && response.data.items ? response.data.items : [];
            filteredMiners.value = miners.value; // Initialize filteredMiners
            const foundMiner = miners.value.find(item => item.miner_name === 'Whatsminer M32');
            if (foundMiner) {
              miner.value = foundMiner;
              setMinerData();
            }
          })
          .catch(function (error) {
            console.log('Form Fetch Error: ', error);
          });
    }

    return {
      miner,
      quantity,
      hashrate,
      power,
      powerCost,
      costOfHw,
      startDate,
      endDate,
      emitMiner,
      miners,
      loadingMiners,
      minerError,
      filteredMiners,
      filterMiners,
      setMinerData
    };
  },
});
</script>

<style lang="scss">
.dashboard-calculator {
  flex: 80%;
}
.dashboard-calculator-form {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding-bottom: 15px;
}

.button-primary__loader {
  width: 150px;
  height: 32px;
  padding: 0;
  text-align: start;
  transition: .3s linear;
}

.button-primary__loader_loading {
  opacity: 0.8;
}

.button-primary__loader__label {
  margin-left: calc(50% - 30px);
}

.loader-left {
  margin-left: 5px;
}

.dashboard-calculator-form__item {
  margin-top: 15px;
  width: 220px;
}

.dashboard-calculator-form__item .label {
  margin-bottom: 3px;
  color: rgba(94, 98, 120, 1);
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;
  height: 28px;
  overflow: hidden;
}

@media only screen and (max-width: 1700px) {
  .dashboard-calculator-form__item {
    width: 180px;
  }

  .dashboard-calculator-form {

    .el-date-editor.el-input, .el-date-editor.el-input__wrapper {
      width: 180px;
    }
  }
}

@media only screen and (max-width: 1100px) {
  .dashboard-calculator-form {
    display: block;

    .el-date-editor.el-input, .el-date-editor.el-input__wrapper {
      width: 100%;
    }
  }

  .dashboard-calculator-form__item {
    margin-bottom: 15px;
    width: 100%;
  }

  .button-primary__loader {
    width: 100%;
  }
}
</style>
