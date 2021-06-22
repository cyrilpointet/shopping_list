<?php

namespace App\Http\Controllers;

use App\Models\Team;
use App\Models\User;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    public function create(Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);

        $team = Team::create([
            'name' => $request->name
        ]);
        $user = $request->user();

        $team->users()->attach($user->id);
        $team->users;
        $team->products;

        return $team;
    }

    public function show($id)
    {
        $team = Team::find($id);
        if (null === $team) {
            return response([
                "message" => "Groupe inconnu"
            ], 404);
        }
        $team->users;
        $team->products;

        return response($team, 200);
    }

    public function addMember($id, Request $request)
    {
        $request->validate([
            'email' => 'required',
        ]);
        $team = Team::find($id);
        if (null === $team) {
            return response([
                "message" => "Groupe inconnu"
            ], 404);
        }

        // Member existe ?
        $user = User::where('email', $request->email)->first();
        if (null === $user) {
            return response([
                "message" => "Membre inconnu"
            ], 404);
        }

        // membre a déjà cette team ?
        $user->teams;
        $teams = $user->teams()->where('team_id', $id)->get();
        if (0 !== count($teams)) {
            return response([
                'message' => ['Déjà membre du groupe']
            ], 401);
        }

        $team->users()->attach($user->id);

        $team->users;
        $team->products;

        return $team;
    }

    public function delete($id)
    {
        $group = Team::find($id);
        if (null === $group) {
            return response([
                "message" => "Groupe inconnu"
            ], 404);
        }

        $group->delete();
        return response([
            'message' => 'Groupe supprimé'
        ], 200);
    }
}
