import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import Conversation from '../views/Conversation.vue'
import Profile from '../views/Profile.vue'
import Search from '../views/Search.vue'
import Photo from '../views/Photo.vue'
import Match from '../views/Match.vue'
import Complete from '../views/Complete.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: '',
    component: Signup,
    meta: {
      islogged: true
    }
  },
  {
    path: '/login',
    name: '',
    component: Login,
    meta: {
      islogged: true
    }
  },
  {
    path: '/conversations',
    name: 'conversations',
    component: Conversation,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/profile/:id',
    name: 'profile',
    component: Profile,
    props: true,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/photos',
    name: 'photo',
    component: Photo,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/match',
    name: 'match',
    component: Match,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/search',
    name: 'search',
    component: Search,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/complete',
    name: 'complete',
    component: Complete,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  linkActiveClass: "active"
})

router.beforeEach((to, from, next) => {
   if (to.matched.some(record => record.meta.requiresAuth)) {
    if (window.localStorage.getItem('token') == null) 
      next('/')
    else 
      next()
  } else {
    next()
  } 
})

router.beforeEach((to, from, next) => {
   if (to.matched.some(record => record.meta.islogged)) {
    if (window.localStorage.getItem('token') != null) 
      next('/match')
    else 
      next()
  } else {
    next()
  } 
})

export default router
