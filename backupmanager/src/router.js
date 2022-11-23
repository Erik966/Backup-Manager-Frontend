import { createRouter, createWebHistory } from "vue-router";
import Home from "./components/Home.vue";
import Login from "./components/Login.vue";
import Register from "./components/Register.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
];

const router = createRouter({
    history: createWebHistory(process.env.Base_URL),
    routes
})

export default router;

// Vue 2 https://www.youtube.com/watch?v=HZe2fcZpMxY&t=126s
// Vue 3 https://www.youtube.com/watch?v=juocv4AtrHo&t=617s