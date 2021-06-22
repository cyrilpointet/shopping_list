import Vue from "vue";

import vuetify from "./plugins/vuetify";
import { router } from "./Router/router";
import { store } from "./Store/store";
import App from "./App";
import { ApiConsumer } from "./Services/ApiConsumer";

new Vue({
    vuetify,
    router,
    store,
    el: "#app",
    components: { App },
    async beforeCreate() {
        const token = localStorage.getItem("token");
        console.log(token);
        if (token) {
            ApiConsumer.setToken(token);
            try {
                await this.$store.dispatch("getUserWithToken");
                await this.$store.commit("setToken", token);
            } catch (e) {
                console.log(e);
                this.$store.dispatch("logout");
                if (this.$route.name !== "account") {
                    this.$router.push({ name: "account" });
                }
            }
        } else {
            this.$store.dispatch("logout");
            if (this.$route.name !== "account") {
                this.$router.push({ name: "account" });
            }
        }
    },
});
