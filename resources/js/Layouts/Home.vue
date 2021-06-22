<template>
    <div>
        <div v-if="user !== null">
            <v-card>
                <v-list-item
                    v-for="team in user.teams"
                    :key="team.id"
                    v-ripple
                    @click="goToTeam(team.id)"
                >
                    <v-list-item-content>
                        <v-list-item-title>{{ team.name }}</v-list-item-title>
                    </v-list-item-content>
                    <v-list-item-icon>
                        <v-icon>mdi-chevron-right</v-icon>
                    </v-list-item-icon>
                </v-list-item>
            </v-card>

            <v-card class="mt-4">
                <v-card-text>
                    <TeamCreator />
                </v-card-text>
            </v-card>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import TeamCreator from "../Components/TeamCreator";

export default {
    name: "Home",
    components: { TeamCreator },
    computed: {
        ...mapState({
            user: (state) => state.user.user,
        }),
    },
    methods: {
        goToTeam(id) {
            this.$router.push({ name: "team", params: { id } });
        },
    },
};
</script>
