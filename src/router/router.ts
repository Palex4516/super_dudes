import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: () => import("../views/HomeView.vue")
        },
        {
            path: '/list',
            component: () => import("../views/ListView.vue")
        },
        {
            path: '/add',
            component: () => import('../views/AddView.vue')
        },
        {
            path: "/details/:id",
            component: () => import("../views/DetailsView.vue")
        }
    ]
});
export default router;