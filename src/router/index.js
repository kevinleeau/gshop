import Vue from 'vue'
import VueRouter from 'vue-router'
import Msite from '@/pages/Msite/Msite.vue'
import Order from '@/pages/Order/Order.vue'
import Search from '@/pages/Search/Search.vue'
import Profile from '@/pages/Profile/Profile.vue'
import Login from '@/pages/Login/Login.vue'
import Shop from '@/pages/Shop/Shop.vue'
import Shopgoods from '@/pages/Shop/Shopgoods/Shopgoods.vue'
import Shopratings from '@/pages/Shop/Shopratings/Shopratings.vue'
import Shopinfo from '@/pages/Shop/Shopinfo/Shopinfo.vue'

Vue.use(VueRouter)
export default new VueRouter({
  routes: [
    {
      path: '/msite',
      component: Msite,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/',
      redirect: '/msite'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/shop',
      component: Shop,
      children: [
        {
          path: '/shop/goods',
          component: Shopgoods
        },
        {
          path: '/shop/ratings',
          component: Shopratings
        },
        {
          path: '/shop/info',
          component: Shopinfo
        },
        {
          path: '',
          redirect: '/shop/goods'
        }
      ]
    }
  ]
})
