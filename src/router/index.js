import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import TenderView from "../views/TenderView.vue";
import SignUpView from "../views/SignUpView.vue";
import LoginView from "../views/LoginView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/tenders",
      name: "tenders",
      component: TenderView,
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUpView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
  ],
});

// router.beforeEach((to, from, next) => {
//   const auth = useAuthStore();
//   const publicPages = ["/login", "/signup"];
//   const authRequired = !publicPages.includes(to.path);

//   if (authRequired && !auth.isAuthenticated) {
//     return next("/login");
//   }

//   next();
// });

export default router;
