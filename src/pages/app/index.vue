<script setup lang="ts">
import { useUserStore } from '../../store/modules/user.ts';

const userStore = useUserStore();
</script>

<template>
  <h1>App</h1>
  <p>{{ userStore.currentUser.id }} - {{ userStore.currentUser.name }}</p>
</template>
