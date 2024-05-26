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

          <select class="form-select" aria-label="Select miner name" v-model="miner" @change="setMinerData()">
            <option v-for="item in miners" :value="item" :key="item.id">{{ item?.miner_name }}</option>
          </select>

        </div>

        <div class="dashboard-calculator-form__item">
          <div class="label">Quantity</div>
          <Field
              type="text"
              class="form-control"
              placeholder="Quantity"
              name="Quantity"
              v-model="quantity"
          />
        </div>

        <div class="dashboard-calculator-form__item">
          <div class="label">Hashrate (TH/s)</div>
          <Field
              type="text"
              class="form-control"
              placeholder="Hashrate (TH/s)"
              name="Hashrate (TH/s)"
              v-model="hashrate"
          />
        </div>

        <div class="dashboard-calculator-form__item">
          <div class="label">Power (W)</div>
          <Field
              type="text"
              class="form-control"
              placeholder="Power (W)"
              name="Power (W)"
              v-model="power"
          />
        </div>

        <div class="dashboard-calculator-form__item">
          <div class="label">Energy Cost (cents per kWh)</div>
          <Field
              type="text"
              class="form-control"
              placeholder="Energy Cost (cents per kWh)"
              name="Energy Cost (cents per kWh)"
              v-model="powerCost"
          />
        </div>

        <div class="dashboard-calculator-form__item">
          <div class="label">Cost of hardware ($ per unit)</div>
          <Field
              type="text"
              class="form-control"
              placeholder="Cost of hardware ($)"
              name="Cost of hardware ($)"
              v-model="costOfHw"
          />
        </div>

        <div class="dashboard-calculator-form__item dashboard-calculator-form__dates">
          <div class="label">Mining Period</div>
          <div class="dashboard-calculator-form__dates__container">
            <div class="dashboard-calculator-form__dates__item">
              <span class="dashboard-calculator-form__dates__item__label">Start Date</span>
              <el-date-picker v-model="startDate" size="large"></el-date-picker>
            </div>
            <div class="dashboard-calculator-form__dates__item">
              <span class="dashboard-calculator-form__dates__item__label">End Date</span>
              <el-date-picker v-model="endDate" size="large"></el-date-picker>
            </div>
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
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from 'vee-validate';
import axios from 'axios';
import moment from "moment";
import { start } from '@popperjs/core';

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
    const miner = ref({ id: 1, miner_name: 'Antminer S19 Pro+ Hyd 198TH/s', hashrate: 198, power: 5445 });
    const quantity = ref(10);
    const hashrate = ref(198);
    const power = ref(5445);
    const powerCost = ref(6);
    const costOfHw = ref(2000);
    const startDate = ref(moment('2019-01-01', 'YYYY-MM-DD').toDate());
    const endDate = ref(moment(new Date()).subtract(1, 'days').format("YYYY-MM-DDTHH:mm:ss"));

    const setMinerData = () => {
      hashrate.value = miner.value.hashrate;
      power.value = miner.value.power;
    }

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

      axios.get(`${host}asics`)
          .then(function (response) {
            miners.value = response && response.data && response.data.items ? response.data.items : [];
            const firstMiner = miners.value[0] ? miners.value[0] : {};
            if (firstMiner.miner_name) {
              miner.value = firstMiner;
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
  width: 220px;
  height: 40px;
  padding: 0;
  margin-top: 12px;
  text-align: start;
  transition: .3s linear;
}

.button-primary__loader_loading {
  opacity: 0.8;
}

.button-primary__loader__label {
  margin-left: calc(50% - 40px);
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

.dashboard-calculator-form__dates {
  width: 100%;

  .el-input {
    width: 220px;
  }

  .label {
    margin-bottom: 5px;
    height: auto;
  }

  &__container {
    display: flex;
    justify-content: space-between;
  }

  &__item {
    position: relative;
    padding-top: 12px;

    &:last-child {
      margin-left: 12px;
    }

    &__label {
      position: absolute;
      top: -4px;
      right: 0;
      z-index: 2;
      font-weight: bold;
      color: #989494;
      font-size: 11px;
    }
  }
}

@media only screen and (max-width: 1700px) {
  .dashboard-calculator-form__item {
    width: 180px;
  }

  .dashboard-calculator-form__dates {
    width: 100%;

    .el-input {
      width: 180px;
    }
  }

  .button-primary__loader {
    width: 180px;
  }
}

@media only screen and (max-width: 1450px) {
  .dashboard-calculator-form__item {
    width: 150px;
  }

  .dashboard-calculator-form__dates {
    width: 100%;

    .el-input {
      width: 150px;
    }
  }

  .button-primary__loader {
    width: 150px;
  }
}


@media only screen and (max-width: 1200px) {
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

  .dashboard-calculator-form__dates {
    width: 100%;

    &__container {
      display: block;
    }

    .button-primary {
      margin-top: 20px;
      margin-left: 0;
    }

    &__item {
      margin-top: 15px;

      &:last-child {
        margin-left: 0;
      }
    }
  }

  .button-primary__loader {
    width: 100%;
  }
}
</style>
