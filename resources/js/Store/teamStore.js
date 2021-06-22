import { ApiConsumer } from "../Services/ApiConsumer";
import { Team } from "../Models/Team";

export const teamStore = {
    namespaced: true,
    state: {
        team: null,
    },
    mutations: {
        setTeam(state, value) {
            state.team = value;
        },
    },
    actions: {
        getTeamById(context, id) {
            return ApiConsumer.get("team/" + id).then((data) => {
                context.commit("setTeam", new Team(data));
            });
        },
        addProduct(context, values) {
            return ApiConsumer.post(`team/${values.teamId}/addProduct`, {
                name: values.name,
            }).then((data) => {
                context.commit("setTeam", new Team(data));
            });
        },
        deleteProduct(context, values) {
            return ApiConsumer.delete(
                `team/${values.teamId}/${values.productId}`
            ).then((data) => {
                context.commit("setTeam", new Team(data));
            });
        },
        deleteTeam(context, id) {
            return ApiConsumer.delete(`team/${id}`).then(() => {
                context.commit("setTeam", null);
            });
        },
        addMember(context, values) {
            return ApiConsumer.post(`team/${values.teamId}/addMember`, {
                email: values.email,
            }).then((data) => {
                context.commit("setTeam", new Team(data));
            });
        },
    },
};
