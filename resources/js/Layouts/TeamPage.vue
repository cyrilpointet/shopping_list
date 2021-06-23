<template>
    <div>
        <v-btn
            text
            x-small
            @click="$router.push({ name: 'home' })"
            class="mb-4"
            color="white"
        >
            <v-icon>mdi-chevron-left</v-icon>retour
        </v-btn>

        <div v-if="ajaxPending" class="d-flex justify-center">
            <v-progress-circular indeterminate color="primary" />
        </div>

        <div v-if="user && team && !ajaxPending">
            <v-card class="mb-4">
                <div class="d-flex align-center pa-2">
                    <h2 class="text-center flex-grow-1">
                        {{ team.name }}
                    </h2>
                    <v-btn icon small color="error" @click="deleteTeam">
                        <v-icon>mdi-delete</v-icon>
                    </v-btn>
                </div>
                <TeamUsersManager />
            </v-card>

            <Products />
            <ProductCreator />
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import Products from "../Components/Products";
import ProductCreator from "../Components/ProductCreator";
import TeamUsersManager from "../Components/TeamUsersManager";

export default {
    name: "TeamPage",
    components: { Products, ProductCreator, TeamUsersManager },
    data: () => {
        return {
            ajaxPending: false,
        };
    },
    computed: {
        ...mapState({
            user: (state) => state.user.user,
            team: (state) => state.team.team,
        }),
    },
    async created() {
        if (!this.team || this.$route.params.id !== this.team.id) {
            try {
                this.ajaxPending = true;
                await this.$store.dispatch(
                    "team/getTeamById",
                    this.$route.params.id
                );
                this.ajaxPending = false;
            } catch {
                this.$router.push({ name: "home" });
            }
        }
    },
    methods: {
        async deleteTeam() {
            try {
                this.ajaxPending = true;
                await this.$store.dispatch("team/deleteTeam", this.team.id);
                await this.$store.dispatch("user/getUserWithToken");
                this.$router.push({ name: "home" });
            } catch {
                this.ajaxPending = false;
                const event = new CustomEvent("displayMsg", {
                    detail: {
                        text: "Erreur",
                        color: "error",
                    },
                });
                document.dispatchEvent(event);
            }
        },
    },
};
</script>
