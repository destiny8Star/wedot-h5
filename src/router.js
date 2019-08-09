import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
    {path: '/', name: 'home', component: Home},
    {path: '/about', name: 'about', component: () => import(/* webpackChunkName: "about" */ './views/About.vue')},
    //邀请好友
    { path: '/invite', name: 'invite', component: () => import(/* webpackChunkName: "invite" */ './views/activities/invite.vue') },
    //注册
    { path: '/landing', name: 'landing', component: () => import(/* webpackChunkName: "land" */ './views/activities/land.vue') },
    //权益
    { path: '/rights', name: 'rights', component: () => import(/* webpackChunkName: "rights" */ './views/activities/rights.vue') },
    //如何赚钱
    { path: '/howDo', name: 'howDo', component: () => import(/* webpackChunkName: "howDo" */ './views/activities/howDo.vue') },
    //何为服务商
    { path: '/whatSer', name: 'whatSer', component: () => import(/* webpackChunkName: "whatSer" */ './views/activities/whatSer.vue') },
    //免费拿活动
    { path: '/freeGet', name: 'freeGet', component: () => import(/* webpackChunkName: "freeGet" */ './views/freeget/freeGet.vue') },
    //订单
    { path: '/order', name: 'order', component: () => import(/* webpackChunkName: "order" */ './views/freeget/order.vue') },
    { path: '/test', name: 'test', component: () => import(/* webpackChunkName: "test" */ './views/freeget/test.vue') },
   //协议
    { path: '/protocol', name: 'protocol', component: () => import(/* webpackChunkName: "protocol" */ './views/share/protocol.vue') },
    // { path: '/landings', name: 'landings', component: () => import(/* webpackChunkName: "landings" */ './views/share/landings.vue') },
  ]
})
