import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path:"/home",
      component:()=>import("./views/Home.vue")
    },
    {
      path:"/cart",
      component:()=>import("./views/Cart.vue")
    },
    {
      path:"/payment",
      component:()=>import("./views/Payment.vue")
    },
    {
      path:"*",
      redirect:"/home"
    }
  ]
})
