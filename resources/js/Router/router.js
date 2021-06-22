import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../Layouts/Home";
import UserPage from "../Layouts/UserPage";
import TeamPage from "../Layouts/TeamPage";

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
    {
        path: "/list/:id",
        name: "team",
        component: TeamPage,
    },
];

const router = new VueRouter({
    routes,
});

export { router };
