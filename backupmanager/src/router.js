import VueRouter from "vue-router";
import Vue from 'vue'
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
];

const router = new VueRouter({
  mode:'history',
  base: ProcessingInstruction.env.Base_URL,
  routes,
});

export default router;

// Vue 2 https://www.youtube.com/watch?v=HZe2fcZpMxY&t=126s
// Vue 3 https://www.youtube.com/watch?v=juocv4AtrHo&t=617s