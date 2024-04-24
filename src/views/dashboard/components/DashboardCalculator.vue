<template>
  <div class="card dashboard-calculator" :class="widgetClasses">
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Historical Calculation</span>
      </h3>

      <div>
        <button class="button-primary button-primary__loader"
                :class="{'button-primary__loader_loading': loading}"
                :disabled="loading" @click="emitMiner()">
          <span class="button-primary__loader__label">
            Calculate
          </span>
          <span
            v-if="loading"
            class="spinner-border spinner-border-sm loader-left"
          ></span>
        </button>
      </div>

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
          <div class="label">Cost of hardware ($)</div>
          <Field
              type="text"
              class="form-control"
              placeholder="Cost of hardware ($)"
              name="Cost of hardware ($)"
              v-model="costOfHw"
          />
        </div>

        <div class="dashboard-calculator-form__item dashboard-calculator-form__date-range">
          <div class="label">Mining Period</div>
          <VueDatePicker v-model="dateRange" range />
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

export default defineComponent({
  name: "dashboard-calculator",
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
    const quantity = ref(3);
    const hashrate = ref(198);
    const power = ref(5445);
    const powerCost = ref(3);
    const costOfHw = ref(6.45);
    const dateRange = ref([moment(new Date()).subtract(15, 'months').toDate(), moment(new Date()).subtract(13, 'months').format("YYYY-MM-DDTHH:mm:ss")]);

    const setMinerData = () => {
      hashrate.value = miner.value.hashrate;
      power.value = miner.value.power;
    }

    const emitMiner = () => {
      const minerData = {
        date_range: dateRange.value,
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
      dateRange,
      emitMiner,
      miners,
      setMinerData
    };
  },
});
</script>

<style>
.dashboard-calculator-form {
  display: flex;
  justify-content: start;
  flex-wrap: wrap;
  padding-bottom: 30px;
  gap: 20px;
}

.button-primary__loader {
  width: 140px;
  height: 37px;
  padding: 0;
  text-align: start;
  transition: .3s linear;
}

.button-primary__loader_loading {
  opacity: 0.8;
}

.button-primary__loader__label {
  margin-left: 40px;
}

.loader-left {
  margin-left: 5px;
}

.dashboard-calculator-form__item .label {
  margin-bottom: 12px;
  color: rgba(94, 98, 120, 1);
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;
}

.dashboard-calculator-form__date-range {
  width: 300px;
}

@media only screen and (max-width: 1100px) {
  .dashboard-calculator-form {
    display: block;
  }

  .dashboard-calculator-form__item {
    margin-bottom: 15px;
  }

  .dashboard-calculator-form__date-range {
    width: 200px;
  }
}
</style>
