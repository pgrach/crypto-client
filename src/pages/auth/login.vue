<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '../../store/modules/user.ts';
import { getTodos } from './login.service.ts';

const userStore = useUserStore();

const todos = ref<any>([]);

onMounted(() => {
  setTimeout(() => {
    userStore.setUser({ id: 2, name: 'Yernar Mussin'});

    setTimeout(() => {
      // router.push('/app')
    }, 550000)
  }, 1500)

  getTodos().then((res: any) => {
    console.log(res, ' ress');
    todos.value = res.data;
  })
})


</script>

<template>
  <h1>Login</h1>
  <p>{{ userStore.currentUser.id }} - {{ userStore.currentUser.name }}</p>
  <div v-for="item in todos">
    {{ item.title }}
  </div>
</template>
