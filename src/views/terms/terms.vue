<script setup>
import { useRouter } from 'vue-router';
</script>

<template>
  <div class="privacy-policy">
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <div class="card-label fw-bold fs-3 mb-4 text-center">Privacy Policy</div>
      </h3>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab beatae commodi corporis dignissimos dolorum, eos facilis magnam nemo neque officiis pariatur quaerat quisquam quod repellat temporibus tenetur velit voluptatem voluptates!
      </p>

    </div>

  </div>
</template>

<style lang="sass">
.privacy-policy
  margin: 20px auto
  max-width: 1200px
  width: 100%

  border-radius: 10px
  border: 1px solid rgba(26, 26, 26, 0.09)
  padding: 20px
  box-sizing: border-box

  p
    margin-top: 10px
</style>
