import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import Home from './views/Home'
import About from './views/About'
import Series from './views/Series'
import Episode from './views/Episode'
import Contact from './views/Contact'
import Subscribe from './views/Subscribe'
import PageNotFound from './views/PageNotFound';

Vue.use(Router)
Vue.use(Meta)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/episodes',
      name: 'episodes',
      component: Series
    },
    {
      path: '/episodes/:id',
      name: 'episode',
      component: Episode
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact
    },
    { 
      path: "/subscribe", 
      name: 'subscribe',
      component: Subscribe
    },
    { 
      path: "*", 
      name: '404',
      component: PageNotFound
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
