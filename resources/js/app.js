import Vue from "vue";

import vuetify from "./Plugins/vuetify";
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
        if (token) {
            ApiConsumer.setToken(token);
            try {
                await this.$store.dispatch("user/getUserWithToken");
                await this.$store.commit("user/setToken", token);
            } catch {
                this.$store.dispatch("user/logout");
                if (this.$route.name !== "account") {
                    this.$router.push({ name: "account" });
                }
            }
        } else {
            this.$store.dispatch("user/logout");
            if (this.$route.name !== "account") {
                this.$router.push({ name: "account" });
            }
        }
    },
});
