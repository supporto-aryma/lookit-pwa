import Vue from "vue";
import Router from "vue-router";
import Home from "./views/app/home";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    name: "category",
    path: "/category/:id",
    component: () =>
      import(/* webpackChunkName: "category" */ "./views/app/category")
  },
  {
    name: "offers",
    path: "/offers",
    component: () =>
      import(/* webpackChunkName: "offers" */ "./views/app/offers")
  },
  {
    name: "cart",
    path: "/cart",
    component: () => import(/* webpackChunkName: "cart" */ "./views/app/cart")
  }
];

const router = new Router({
  base: "/fl_app/lookit-pwa",
  routes,
  mode: "history"
});

export default router;
