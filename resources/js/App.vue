<template>
    <v-app>
        <div>
            <v-app-bar color="deep-purple accent-4" dark>
                <v-toolbar-title>Pouet</v-toolbar-title>
            </v-app-bar>
        </div>
        <v-container>
            <router-view></router-view>
        </v-container>
    </v-app>
</template>

<script>
export default {
    name: "App",
};
</script>
