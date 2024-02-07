import { createApp } from 'vue';
import './assets/styles/main.sass';
import App from './App.vue';
import { pinia } from './store';
import router from './router';

createApp(App).mount('#app')

const app = createApp(App);

app.use(pinia);
app.use(router);

app.mount('#app');
