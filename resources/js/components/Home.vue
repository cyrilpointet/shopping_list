<template>
    <div>
        <h1>Coucou</h1>
        <p>{{ text }}</p>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "Home",
    computed: {
        ...mapState({
            text: (state) => state.text,
        }),
    },
};
</script>
