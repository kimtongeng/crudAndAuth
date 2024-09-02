import { createRouter, createWebHistory } from "vue-router";
import userStore from "@/stores/authStore";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/Home.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/Loing.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("@/views/Register.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/About.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/store",
      name: "store",
      component: () => import("@/views/Store.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/:catchAll(.*)",
      name: "searchNotFound",
      component: () => import("@/views/SearchNotFount.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const auth = userStore();
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!auth.isAuth) {
      next("/login");
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
