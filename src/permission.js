import router from '@/routes/index.js'

router.beforeEach((to, from, next) => {
    console.log(from,to)
    next()
})

router.afterEach(() => {
})
