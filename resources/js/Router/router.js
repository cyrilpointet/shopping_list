import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home";
import UserPage from "../components/UserPage";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
    },
    {
        path: "/account",
        name: "account",
        component: UserPage,
    },
];

const router = new VueRouter({
    routes,
});

export { router };
