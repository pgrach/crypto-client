// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/home/index.vue';
import App from '../pages/app/index.vue';
import Login from '../pages/auth/login.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/app',
        name: 'App',
        component: App,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
