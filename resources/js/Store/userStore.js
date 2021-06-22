import { User } from "../Models/User";
import { ApiConsumer } from "../Services/ApiConsumer";
import { UserTeam } from "../Models/UserTeam";

export const userStore = {
    namespaced: true,
    state: {
        user: null,
        token: null,
    },
    getters: {
        isLogged: (state) => {
            return state.user !== null && state.token !== null;
        },
    },
    mutations: {
        setUser(state, value) {
            state.user = value;
        },
        setToken(state, value) {
            state.token = value;
        },
        addTeam(state, value) {
            state.user.teams.push(value);
        },
        removeTeam(state, teamId) {
            const teams = state.user.teams.filter((elem) => elem.id !== teamId);
            state.user.teams = teams;
        },
    },
    actions: {
        storeUserAndToken(context, value) {
            const user = new User(value.user);
            context.commit("setUser", user);
            context.commit("setToken", value.token);
            ApiConsumer.setToken(value.token);
            localStorage.setItem("token", value.token);
        },

        createUser(context, values) {
            return ApiConsumer.post("register", values).then((data) => {
                context.dispatch("storeUserAndToken", data);
            });
        },

        logUser(context, values) {
            return ApiConsumer.post("login", values).then((data) => {
                context.dispatch("storeUserAndToken", data);
            });
        },

        getUserWithToken(context) {
            return new Promise((resolve, reject) => {
                ApiConsumer.get("user")
                    .then((data) => {
                        const user = new User(data);
                        context.commit("setUser", user);
                        resolve();
                    })
                    .catch((e) => {
                        reject(e);
                    });
            });
        },

        createTeam(context, name) {
            return ApiConsumer.post("team", { name: name }).then((data) => {
                context.commit("addTeam", new UserTeam(data));
            });
        },

        logout(context) {
            context.commit("setUser", null);
            context.commit("setToken", null);
            ApiConsumer.removeToken();
            localStorage.removeItem("token");
        },
    },
};
