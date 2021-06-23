import "@mdi/font/css/materialdesignicons.css";
import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify);

const opts = {
    theme: {
        themes: {
            light: {
                primary: "#724b19",
                error: "#d00000",
            },
        },
    },
    icons: {
        iconfont: "mdi",
    },
};

export default new Vuetify(opts);
