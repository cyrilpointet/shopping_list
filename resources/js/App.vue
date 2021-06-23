<template>
    <v-app class="mainView">
        <div>
            <v-app-bar color="primary" dark>
                <v-toolbar-title>Team List</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon v-if="isLogged" @click="logout">
                    <v-icon>mdi-exit-to-app</v-icon>
                </v-btn>
            </v-app-bar>
        </div>
        <v-container>
            <transition name="fade" mode="out-in">
                <router-view></router-view>
            </transition>
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

<style lang="scss">
.mainView {
    background: linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)),
        url("../assets/background_mobile.jpg") no-repeat center !important;
    background-size: cover !important;
    @media (orientation: landscape) {
        background: linear-gradient(rgba(0, 0, 0, 0.15), rgba(0, 0, 0, 0.15)),
            url("../assets/background_desktop.jpg") no-repeat center !important;
        background-size: cover !important;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: all 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    transform: scaleX(0);
    opacity: 0;
}
</style>
