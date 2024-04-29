<template>
  <div class="card card-xl-stretch dashboard-trading-analysis">
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">Trading analysis (Basic)</span>
      </h3>

    </div>

    <div class="card-body">
      <div class="dashboard-trading-analysis__tabs">
        <div class="dashboard-trading-analysis__tab dashboard-trading-analysis__tab_active">
          Result if BTC Sold
        </div>

        <div class="dashboard-trading-analysis__tab">
          Result if BTC not Sold
        </div>
      </div>

      <div class="dashboard-trading-analysis__line"></div>

      <div class="dashboard-trading-analysis__option" :class="{'dashboard-trading-analysis__option_active': selectedDay}">
        <div class="form-check form-check-custom form-check-success form-check-solid">
          <div class="dashboard-trading-analysis__option__check-line"></div>
          <input class="form-check-input" type="checkbox" v-model="selectedDay"/>
          <label class="form-check-label" for="">
            Everyday
          </label>
        </div>

        <div class="dashboard-trading-analysis__option__item">
          <div class="dashboard-trading-analysis__option__item__value">$63,240</div>
          <div class="dashboard-trading-analysis__option__item__label">Total Revenue</div>
        </div>

        <div class="dashboard-trading-analysis__option__item">
          <div class="dashboard-trading-analysis__option__item__value">$63,240</div>
          <div class="dashboard-trading-analysis__option__item__label">Total Cost</div>
        </div>

        <div class="dashboard-trading-analysis__option__item">
          <div class="dashboard-trading-analysis__option__item__value">$63,240</div>
          <div class="dashboard-trading-analysis__option__item__label">Total Profit</div>
        </div>
      </div>

      <div v-if="timeMode === 'monthly'" class="dashboard-trading-analysis__option" :class="{'dashboard-trading-analysis__option_active': selectedWeek}" >
        <div class="form-check form-check-custom form-check-success form-check-solid">
          <div class="dashboard-trading-analysis__option__check-line"></div>
          <input class="form-check-input" type="checkbox" v-model="selectedWeek"/>
          <label class="form-check-label" for="">
            Once a week
          </label>
        </div>

        <div class="dashboard-trading-analysis__option__item">
          <div class="dashboard-trading-analysis__option__item__value">$63,240</div>
          <div class="dashboard-trading-analysis__option__item__label">Total Revenue</div>
        </div>

        <div class="dashboard-trading-analysis__option__item">
          <div class="dashboard-trading-analysis__option__item__value">$63,240</div>
          <div class="dashboard-trading-analysis__option__item__label">Total Cost</div>
        </div>

        <div class="dashboard-trading-analysis__option__item">
          <div class="dashboard-trading-analysis__option__item__value">$63,240</div>
          <div class="dashboard-trading-analysis__option__item__label">Total Profit</div>
        </div>
      </div>

      <div v-if="timeMode === 'monthly'" class="dashboard-trading-analysis__option" :class="{'dashboard-trading-analysis__option_active': selectedMonth}" >
        <div class="form-check form-check-custom form-check-success form-check-solid">
          <div class="dashboard-trading-analysis__option__check-line"></div>
          <input class="form-check-input" type="checkbox" v-model="selectedMonth"/>
          <label class="form-check-label" for="">
            Once a month
          </label>
        </div>


        <div class="dashboard-trading-analysis__option__item">
          <div class="dashboard-trading-analysis__option__item__value">$63,240</div>
          <div class="dashboard-trading-analysis__option__item__label">Total Revenue</div>
        </div>

        <div class="dashboard-trading-analysis__option__item">
          <div class="dashboard-trading-analysis__option__item__value">$63,240</div>
          <div class="dashboard-trading-analysis__option__item__label">Total Cost</div>
        </div>

        <div class="dashboard-trading-analysis__option__item">
          <div class="dashboard-trading-analysis__option__item__value">$63,240</div>
          <div class="dashboard-trading-analysis__option__item__label">Total Profit</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, ref, watch } from "vue";
import axios from 'axios';
import moment from "moment";

export default defineComponent({
  name: "dashboard-trading-analysis",
  props: {
    timeMode: Object,
  },
  emits: ['emitSellMode'],
  setup(props, ctx) {
    const selectedDay = ref(true);
    const selectedWeek = ref(false);
    const selectedMonth = ref(false);

    watch(
        () => props.timeMode,
        (newValue, oldValue) => {
          if (newValue === 'daily') {
            selectedDay.value = true
            selectedWeek.value = false
            selectedMonth.value = false
          }
        },
        { deep: true }
    )

    watch(() => selectedDay.value,
        (newValue, oldValue) => {
          if (newValue === true) {
            selectedWeek.value = false
            selectedMonth.value = false
            ctx.emit('emitSellMode', 'daily');
          }
        })

    watch(() => selectedWeek.value,
        (newValue, oldValue) => {
          if (newValue === true) {
            selectedDay.value = false
            selectedMonth.value = false
            ctx.emit('emitSellMode', 'weekly');
          }
        })

    watch(() => selectedMonth.value,
        (newValue, oldValue) => {
          if (newValue === true) {
            selectedDay.value = false
            selectedWeek.value = false
            ctx.emit('emitSellMode', 'monthly');
          }
        })

    return {
      selectedDay,
      selectedWeek,
      selectedMonth
    };
  },
});
</script>

<style lang="sass">
.dashboard-trading-analysis
  padding-bottom: 15px
  width: 100%

  &__tabs
    margin-top: 10px
    display: flex
    gap: 37px

  &__tab
    color: #A1A5B7
    font-size: 16px
    font-weight: 600
    line-height: 16px
    padding: 0 0 20px 0
    cursor: pointer

    &_active
      color: #3F4254
      border-bottom: 1px solid rgba(62, 151, 255, 1)

  &__line
    width: 100%
    height: 1px
    background: rgba(225, 227, 234, 1)
    margin-bottom: 30px

  &__option
    margin-bottom: 15px
    padding: 30px 55px 30px 15px
    display: flex
    justify-content: space-between
    align-items: center
    border-radius: 6px
    border: 1px #E1E3EA dashed

    .form-check-custom
      width: 250px

    &__check-line
      height: 30px
      width: 3px
      background: rgba(62, 151, 255, 1)
      margin-right: 7px

    .form-check-label
      color: #3F4254
      font-size: 16px
      font-weight: 600
      line-height: 16px
      margin-left: 13px
      margin-top: 4px

    &__item

      &__value
        color: #7E8299
        font-size: 20px
        font-weight: 600
        line-height: 20px
        text-align: center

      &__label
        margin-top: 12px
        color: #E1E3EA
        font-size: 18px
        font-weight: 600
        line-height: 18px
        text-align: center

    &_active
      background: #EEF6FF
      border: 1px #3E97FF dashed

      .dashboard-trading-analysis__option__check-line
        background: #47BE7D

      .dashboard-trading-analysis__option__item__value
        color: #3F4254

      .dashboard-trading-analysis__option__item__label
        color: rgba(71, 190, 125, 1)

@media only screen and (max-width: 1000px)
  .dashboard-trading-analysis__option
    display: block

    &__item
      padding-left: 45px

      &__value
        margin-top: 20px
        text-align: start

      &__label
        margin-top: 5px
        text-align: start
</style>
