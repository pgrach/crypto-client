<template>
  <div class="dashboard-access-form d-flex flex-column flex-lg-row flex-column-fluid">
    <div
        class="d-flex flex-lg-row-fluid w-lg-50 bgi-size-cover bgi-position-center order-1 order-lg-1"
        :style="`background-image: url('${getAssetPath(
        '/media/img/forgot_background.png'
      )}')`"
    >
      <div class="d-flex flex-column flex-start">
        <img
            class="d-none d-lg-block w-500px w-xl-600px"
            :src="getAssetPath('media/img/sign_background.png')"
            alt=""
        />
      </div>
    </div>

    <div class="d-flex flex-column flex-lg-row-fluid p-10 order-2 order-lg-2 w-100">
      <div class="d-flex flex-center flex-column flex-lg-row-fluid">

        <img class="dashboard-access-form__close" :src="getAssetPath('media/img/close.svg')" @click="routeToDashboard" />

        <div class="w-lg-500px p-10">
            <VForm
                class="form w-100"
                @submit="onSubmitBeta"
                :validation-schema="joinBetaValidation"
                :initial-values="{ name: '', email: '' }"
            >
              <div class="text-center mb-10">
                <div class="fs-2 fw-bold">
                  Access Form
                </div>
              </div>
              <div class="fv-row mb-10">
                <label class="form-label fs-6 fw-bold text-gray-900">Full Name</label>
                <Field
                    tabindex="1"
                    class="form-control form-control-lg form-control-solid"
                    type="text"
                    name="name"
                    autocomplete="off"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="name" />
                  </div>
                </div>
              </div>

              <div class="fv-row mb-10">
                <label class="form-label fs-6 fw-bold text-gray-900">Email</label>
                <Field
                    tabindex="1"
                    class="form-control form-control-lg form-control-solid"
                    type="text"
                    name="email"
                    autocomplete="off"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="email" />
                  </div>
                </div>
              </div>

              <div class="fv-row mb-10">
                <label class="form-label fs-6 fw-bold text-gray-900">Company Name</label>
                <Field
                    tabindex="1"
                    class="form-control form-control-lg form-control-solid"
                    type="text"
                    name="company"
                    autocomplete="off"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="company" />
                  </div>
                </div>
              </div>

              <div class="fv-row mb-10">
                <label class="form-label fs-6 fw-bold text-gray-900">Telegram</label>
                <Field
                    tabindex="1"
                    class="form-control form-control-lg form-control-solid"
                    type="text"
                    name="telegram"
                    autocomplete="off"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="telegram" />
                  </div>
                </div>
              </div>

              <div class="fv-row mb-10">
                <label class="form-label fs-6 fw-bold text-gray-900">Performance in MW</label>
                <el-slider v-model="performance" />
              </div>

              <div class="fv-row mb-10">
                <label class="form-label fs-6 fw-bold text-gray-900">Comments</label>
                <Field
                    tabindex="1"
                    class="form-control form-control-lg form-control-solid"
                    type="text"
                    name="comments"
                    autocomplete="off"
                />
                <div class="fv-plugins-message-container">
                  <div class="fv-help-block">
                    <ErrorMessage name="comments" />
                  </div>
                </div>
              </div>

              <div class="dashboard-access-form__accept">
                <el-checkbox v-model="acceptPrivacy" label="I Accept the" size="large" />
                <div class="dashboard-access-form__accept__privacy" @click="dialogVisible = true">Privacy Policy</div>
              </div>

              <div v-if="!acceptPrivacy && acceptPrivacyValidation" class="text-danger p-2 mb-2">
                To continue accept Privacy Policy
              </div>

              <div class="text-center">
                <button
                    tabindex="3"
                    type="submit"
                    ref="submitButton"
                    id="kt_sign_in_submit"
                    class="btn btn-lg btn-primary w-100 mb-5"
                >
                  <span class="indicator-label"> Send </span>
                  <span class="indicator-progress">
                    Please wait...<span class="spinner-border spinner-border-sm align-middle ms-2"></span>
                  </span>
                </button>
              </div>
            </VForm>
          </div>
      </div>
      <div class="d-flex flex-center flex-wrap px-5">
        <div class="d-flex fw-semibold text-primary fs-base">
          <div class="px-5 cursor-pointer" @click="routeToHome()">Home</div>
          <div class="px-5 cursor-pointer" @click="routeToDashboard()">Dashboard</div>
          <div class="px-5 cursor-pointer" @click="routeToTerms()">Terms & Privacy Policy</div>
        </div>
      </div>
    </div>

    <el-dialog
        v-model="dialogVisible"
        width="80%"
    >
      <DashboardTerms></DashboardTerms>
    </el-dialog>

  </div>
</template>

<script lang="ts">
import { getAssetPath } from "@/core/helpers/assets";
import { defineComponent, ref } from "vue";
import { ErrorMessage, Field, Form as VForm } from "vee-validate";
import { useRouter } from "vue-router";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import DashboardTerms from '@/views/terms/terms.vue';

export default defineComponent({
  name: "dashboard-access-form",
  components: {
    DashboardTerms,
    Field,
    VForm,
    ErrorMessage,
  },
  setup() {
    const router = useRouter();
    const submitButton = ref<HTMLButtonElement | null>(null);
    const joinBetaValidation = Yup.object().shape({
      name: Yup.string().min(4).required().label("Full Name"),
      email: Yup.string().email().required().label("Email"),
      company: Yup.string().min(4).required().label("Company Name"),
      telegram: Yup.string().min(4).required().label("Telegram"),
      comments: Yup.string().label("Comments")
    });
    const performance = ref(29);
    const acceptPrivacy = ref(false);
    const acceptPrivacyValidation = ref(false);
    const dialogVisible = ref(false);

    const onSubmitBeta = async (values: any) => {
      values = values as any;

      if (acceptPrivacy.value === false) {
        acceptPrivacyValidation.value = true
        return;
      }

      if (submitButton.value) {
        // eslint-disable-next-line
        submitButton.value!.disabled = true;
        // Activate indicator
        submitButton.value.setAttribute("data-kt-indicator", "on");
      }

      console.log(values, ' FORM');
      console.log(performance, ' PERFORMANCE');

      const errors = true;

      if (errors) {
        Swal.fire({
          text: "Successfully sent!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "Ok, got it!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semibold btn-light-primary",
          },
        }).then(() => {
          router.push({ path: '/'});
        });
      } else {
        Swal.fire({
          text: "Something went wrong!",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "Try again!",
          heightAuto: false,
          customClass: {
            confirmButton: "btn fw-semibold btn-light-danger",
          },
        }).then(() => {});
      }

      //Deactivate indicator
      submitButton.value?.removeAttribute("data-kt-indicator");
      // eslint-disable-next-line
      submitButton.value!.disabled = false;
    };

    const routeToDashboard = () => {
      router.push({ path: '/dashboard' });
    }

    const routeToTerms = () => {
      router.push({ path: '/terms-privacy' });
    }

    const routeToHome = () => {
      router.push({ path: "/" });
    }

    const routeToBeta = () => {
      router.push({ path: "/access-form" });
    }

    return {
      onSubmitBeta,
      joinBetaValidation,
      submitButton,
      getAssetPath,
      performance,
      acceptPrivacy,
      acceptPrivacyValidation,
      routeToDashboard,
      routeToHome,
      routeToBeta,
      routeToTerms,
      dialogVisible
    };
  },
});
</script>

<style lang="sass">
.dashboard-access-form
  position: relative

  &__close
    position: absolute
    top: 20px
    right: 20px
    cursor: pointer

  &__accept
    display: flex
    align-items: center

    &__privacy
      margin-left: 5px
      color: #3E97FF
      font-size: 14px
      font-weight: 600
      cursor: pointer


</style>
