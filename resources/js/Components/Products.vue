<template>
    <v-card>
        <v-list-item v-for="product in team.products" :key="product.id">
            <v-list-item-content>
                <v-list-item-title>{{ product.name }}</v-list-item-title>
            </v-list-item-content>
            <v-btn
                icon
                :disabled="ajaxPending"
                color="error"
                @click="deleteItem(product.id)"
            >
                <v-icon>mdi-delete</v-icon>
            </v-btn>
        </v-list-item>
        <p v-if="team.products.length < 1" class="pa-4">
            Aucune entrée dans la liste
        </p>
    </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "Products",
    data: () => {
        return {
            ajaxPending: false,
        };
    },
    computed: {
        ...mapState({
            team: (state) => state.team.team,
        }),
    },
    methods: {
        async deleteItem(id) {
            if (!this.ajaxPending) {
                this.ajaxPending = true;
                await this.$store.dispatch("team/deleteProduct", {
                    productId: id,
                    teamId: this.team.id,
                });
                this.ajaxPending = false;
            }
        },
    },
};
</script>
