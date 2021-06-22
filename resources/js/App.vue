<template>
    <v-app>
        <div>
            <v-app-bar color="deep-purple accent-4" dark>
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
    </v-app>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
    name: "App",
    computed: {
        ...mapState({
            user: (state) => state.user,
        }),
        ...mapGetters({
            isLogged: "isLogged",
        }),
    },
    methods: {
        logout() {
            this.$store.dispatch("logout");
            this.$router.push({ name: "account" });
        },
    },
};
</script>
