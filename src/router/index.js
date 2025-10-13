import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import TenderView from '../views/TenderView.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/tenders',
    name: 'tenders',
    component: TenderView
  }
  ],
});

export default router;