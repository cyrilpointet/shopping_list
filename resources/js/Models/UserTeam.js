export class UserTeam {
    static fromCreation(newTeam) {
        return new UserTeam({
            id: newTeam.id,
            name: newTeam.name,
            created_at: newTeam.created_at,
        });
    }

    constructor(rawTeam) {
        this.id = rawTeam.id;
        this.name = rawTeam.name;
        this.created_at = rawTeam.created_at;
    }

    get createdAt() {
        const createdAt = new Date(this.created_at);
        return createdAt.toLocaleDateString("fr-FR");
    }
}
