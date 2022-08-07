import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ArticleView from '../views/ArticleView.vue'
import LoginView from '../views/LoginView.vue'
import NewArticleView from '../views/NewArticleView.vue'
import ChangePassword from '../views/ChangePassword.vue'
import NotFound from '../views/NotFound.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/article/:id',
    name: 'article',
    component: ArticleView,
  },
  {
    path: '/articles/new',
    name: 'new_article',
    component: NewArticleView,
  },
  {
    path: '/update/password',
    name: 'update_password',
    component: ChangePassword
  },
  {
    path: '/404',
    name: 'not_found',
    component: NotFound
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

