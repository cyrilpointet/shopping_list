<template>
    <v-card class="mt-4">
        <v-card-text>
            <v-form ref="form" v-model="valid">
                <v-text-field
                    v-model="name"
                    label="Ajouter un produit"
                    :rules="[rules.required]"
                    @keyup.enter="addProduct"
                />
                <v-btn
                    color="primary"
                    :disabled="!valid"
                    :loading="ajaxPending"
                    @click="addProduct"
                >
                    Ok
                </v-btn>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script>
import { formValidators } from "../Services/formValidators";
import { mapState } from "vuex";

export default {
    name: "ProductCreator",
    data() {
        return {
            valid: true,
            name: "",
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
        async addProduct() {
            this.ajaxPending = true;
            try {
                await this.$store.dispatch("team/addProduct", {
                    name: this.name,
                    teamId: this.team.id,
                });
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
