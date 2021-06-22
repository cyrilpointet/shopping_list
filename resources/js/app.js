import Vue from "vue";

import vuetify from "./plugins/vuetify";
import { router } from "./Router/router";
import { store } from "./Store/store";
import App from "./App";

new Vue({
    vuetify,
    router,
    store,
    el: "#app",
    components: { App },
});
