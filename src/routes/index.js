import Vue from "vue"
import VueRouter from "vue-router"
Vue.use(VueRouter)
const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('@/pages/home/index')
        }
    ]
})


export default router

