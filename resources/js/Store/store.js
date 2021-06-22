import Vue from "vue";
import Vuex from "vuex";
import { userStore } from "./userStore";
import { teamStore } from "./teamStore";

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        user: userStore,
        team: teamStore,
    },
});

export { store };
