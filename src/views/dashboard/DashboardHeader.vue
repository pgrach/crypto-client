<template>
  <div class="dashboard-header">
    <div class="dashboard-header__main">
      <img alt="Logo" src="/media/img/logo_aidala.svg" class="h-25px h-lg-25px">
      <div class="dashboard-header__main__title">Aidala</div>
      <div class="dashboard-header__main__tab">Dashboard</div>
      <div class="dashboard-header__main__link">Learn more about methodology</div>
    </div>
    <div class="dashboard-header__join">
      <div class="dashboard-header__main__tab cursor-pointer" @click="showDialog">Join our beta list</div>
    </div>

    <el-dialog
        v-model="dialogVisible"
        width="1000"
        class="join-beta-dialog"
    >
      <div class="join-beta-dialog-container">
        <div class="join-beta-dialog__content">
          <div class="join-beta-dialog__title">Business Continuity Software Beta</div>
          <ul class="join-beta-dialog__list">
            <li>Real-time Profitability Monitoring,</li>
            <li>Accurately predict future mining yields</li>
            <li>Identify market trends in advance to stay ahead</li>
            <li>Chat with your CFO co-pilot</li>
            <li>Optimize timing for equipment upgrades</li>
          </ul>
          <div>
            <el-button @click="routeToAccessForm">Join Our Beta List</el-button>
          </div>
        </div>

        <img src="/media/img/join_beta.png" class="join-beta-dialog__img">
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from 'vue-router';

export default defineComponent({
  name: "dashboard-header",
  components: {
  },
  setup() {
    const router = useRouter();
    const dialogVisible = ref(false)

    const routeToAccessForm = () => {
      router.push({ path: '/access-form' });
    }

    const showDialog = () => {
      dialogVisible.value = true;
    }

    return {
      showDialog,
      dialogVisible,
      routeToAccessForm
    }
  }
});
</script>

<style lang="sass">
.dashboard-header
  display: flex
  justify-content: space-between
  align-items: center
  background: #181C32
  padding: 10px 50px

.dashboard-header__main
  display: flex
  color: #fff
  justify-content: start
  align-items: center

  &__title
    color: #fff
    font-size: 20px
    font-weight: 600
    line-height: 14.33px
    margin-left: 5px
    margin-right: 50px

  &__tab
    padding: 7px 14px
    background: #3F4254
    border-radius: 6px
    color: #fff
    font-size: 15px
    font-weight: 600
    line-height: 16px

  &__link
    color: #858585
    font-size: 15px
    font-weight: 600
    line-height: 16px
    margin-left: 20px
    cursor: pointer

.join-beta-dialog
  background: linear-gradient(112deg, #00D2FF 0%, #3A7BD5 100%)
  border-radius: 12px
  padding: 20px 30px 0

  &-container
    display: flex
    justify-content: space-between

  &__img
    width: 391px
    height: auto

  &__title
    color: #fff
    font-size: 30px
    font-weight: 600
    line-height: 36px
    margin-bottom: 20px
    width: 316px

  &__list
    padding-left: 20px
    margin-bottom: 40px
    list-style-type: disc

    li
      color: #fff
      font-size: 15px
      font-weight: 500
      line-height: 24px

  .el-button
    background: #50CD89
    border-radius: 6px
    border: none
    color: #fff

@media only screen and (max-width: 1200px)
  .dashboard-header
    padding: 10px 10px
</style>
