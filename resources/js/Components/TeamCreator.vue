<template>
    <div>
        <v-form ref="form" v-model="valid">
            <v-text-field
                v-model="name"
                label="Créer une nouvelle liste"
                :rules="[rules.required]"
            />
            <v-btn
                color="primary"
                :disabled="!valid"
                :loading="ajaxPending"
                @click="createTeam"
            >
                Créer
            </v-btn>
        </v-form>
    </div>
</template>

<script>
import { formValidators } from "../Services/formValidators";

export default {
    name: "TeamCreator",
    data() {
        return {
            valid: true,
            name: "",
            rules: formValidators,
            ajaxPending: false,
        };
    },
    methods: {
        async createTeam() {
            this.ajaxPending = true;
            try {
                await this.$store.dispatch("user/createTeam", this.name);
                this.ajaxPending = false;
                this.name = "";
            } catch (error) {
                this.ajaxPending = false;
                const event = new CustomEvent("displayMsg", {
                    detail: {
                        text: "Erreur server",
                        color: "error",
                    },
                });
                document.dispatchEvent(event);
            }
        },
    },
};
</script>
