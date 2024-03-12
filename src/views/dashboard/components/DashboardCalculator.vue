<template>
  <div class="card dashboard-calculator" :class="widgetClasses">
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Calculator</span>
      </h3>

      <div>
        <button class="button-primary" @click="calculate()">Calculate</button>
      </div>

    </div>

    <div class="card-body">

      <div class="dashboard-calculator-form">
        <div class="dashboard-calculator-form__item">
          <div class="label">Miner</div>
          <Field
              type="text"
              class="form-control"
              placeholder="Address Line"
              name="Address Line"
              v-model="address"
          />
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
          <div class="label">Power Cost</div>
          <Field
              type="text"
              class="form-control"
              placeholder="Power Cost"
              name="Power Cost"
              v-model="powerCost"
          />
        </div>

        <div class="dashboard-calculator-form__item">
          <div class="label">Block Reward (BTC)</div>
          <Field
              type="text"
              class="form-control"
              placeholder="Block Reward (BTC)"
              name="Block Reward (BTC)"
              v-model="blockReward"
          />
        </div>

      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from 'vee-validate';
import axios from 'axios';

export default defineComponent({
  name: "dashboard-calculator",
  props: {
    widgetClasses: String,
    height: Number,
  },
  components: {
    Field,
  },
  setup() {

    const address = ref('Address Line 1');
    const quantity = ref(3);
    const hashrate = ref(198);
    const power = ref(5445);
    const powerCost = ref(322);
    const blockReward = ref(6.45);

    const calculate = () => {
      console.log('calculate')
    }

    onBeforeMount(() => {
      fetchFormData();
    });

    const fetchFormData = () => {
      const host = import.meta.env.VITE_APP_API_HOST;

      axios.get(`${host}asics`)
          .then(function (response) {
            console.log(response, ' form data response')
          })
          .catch(function (error) {
            console.log('Form Fetch Error: ', error);
          });
    }

    return {
      address,
      quantity,
      hashrate,
      power,
      powerCost,
      blockReward,
      calculate
    };
  },
});
</script>

<style>
.dashboard-calculator-form {
  display: flex;
  justify-content: space-between;
  padding-bottom: 30px;
  gap: 10px;
}

.dashboard-calculator-form__item .label {
  margin-bottom: 12px;
  color: rgba(94, 98, 120, 1);
  font-size: 14px;
  font-weight: 600;
  line-height: 14px;
}

@media only screen and (max-width: 1100px) {
  .dashboard-calculator-form {
    display: block;
  }

  .dashboard-calculator-form__item {
    margin-bottom: 15px;
  }
}
</style>
