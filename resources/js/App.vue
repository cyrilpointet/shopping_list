<template>
    <v-app>
        <div>
            <v-app-bar color="primary" dark>
                <v-toolbar-title>Pouet</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon v-if="isLogged" @click="logout">
                    <v-icon>mdi-exit-to-app</v-icon>
                </v-btn>
            </v-app-bar>
        </div>
        <v-container>
            <router-view></router-view>
        </v-container>
        <MsgDisplayer />
        <ConfirmModal />
    </v-app>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import MsgDisplayer from "./Components/MsgDisplayer";
import ConfirmModal from "./Components/ConfirmModal";

export default {
    name: "App",
    components: { MsgDisplayer, ConfirmModal },
    computed: {
        ...mapState({
            user: (state) => state.user.user,
        }),
        ...mapGetters({
            isLogged: "user/isLogged",
        }),
    },
    methods: {
        logout() {
            this.$store.dispatch("user/logout");
            this.$router.push({ name: "account" });
        },
    },
};
</script>
