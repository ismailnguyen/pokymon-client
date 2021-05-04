import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

import Login from './views/Login.vue'
import Home from './views/Home.vue'

import { requireAuth } from './auth'

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '*',
            redirect: '/'
        },
		{
            name: 'Home',
            path: '/',
            component: Login 
        },
        {
            name: 'Room',
            path: '/room/:id',
            beforeEnter: requireAuth,
            component: Home 
        }
    ]
});

export default router;