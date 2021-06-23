<template>
    <div>
        <div class="d-flex pa-2 align-center">
            <v-chip v-for="user in team.users" :key="user.id" class="mr-2">
                {{ user.name }}
            </v-chip>
            <v-chip @click="isOpen = true">
                <v-icon>mdi-account-plus</v-icon>
            </v-chip>
        </div>

        <v-dialog v-model="isOpen" width="500">
            <v-card>
                <div class="pa-2">
                    <h4 class="text-center">Rechercher un membre</h4>
                    <v-text-field
                        v-model="email"
                        label="Email"
                        :rules="[rules.required, rules.email]"
                    />
                    <v-btn
                        text
                        color="primary"
                        :disabled="!valid"
                        :loading="ajaxPending"
                        @click="addMember"
                    >
                        ok
                    </v-btn>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapState } from "vuex";
import { formValidators } from "../Services/formValidators";

export default {
    name: "TeamUsersManager",
    data: () => {
        return {
            isOpen: false,
            valid: true,
            email: "",
            rules: formValidators,
            ajaxPending: false,
        };
    },
    computed: {
        ...mapState({
            team: (state) => state.team.team,
        }),
    },
    methods: {
        async addMember() {
            try {
                this.ajaxPending = true;
                await this.$store.dispatch("team/addMember", {
                    teamId: this.team.id,
                    email: this.email,
                });
                this.ajaxPending = false;
                this.isOpen = false;
                this.email = "";
            } catch {
                this.ajaxPending = false;
                this.isOpen = false;
                this.email = "";
                const event = new CustomEvent("displayMsg", {
                    detail: {
                        text: "membre inexistant ou déjà présent",
                        color: "error",
                    },
                });
                document.dispatchEvent(event);
            }
        },
    },
};
</script>
