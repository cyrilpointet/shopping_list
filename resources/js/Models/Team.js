import { TeamUser } from "./TeamUser";
import { Product } from "./Product";

export class Team {
    constructor(rawTeam) {
        this.id = rawTeam.id;
        this.name = rawTeam.name;
        this.users = [];
        rawTeam.users.forEach((user) => {
            this.users.push(new TeamUser(user));
        });
        this.products = [];
        rawTeam.products.forEach((product) => {
            this.products.push(new Product(product));
        });
    }
}
