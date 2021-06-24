<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Team;
use Illuminate\Support\Facades\Notification;
use App\Notifications\PushNotif;

class ProductController extends Controller
{
    public function create($id, Request $request)
    {
        $request->validate([
            'name' => 'required',
        ]);

        $team = Team::find($id);
        if (null === $team) {
            return response([
                "message" => "Groupe inconnu"
            ], 404);
        }

        Product::create([
            'name' => $request->name,
            'team_id' => $id
        ]);

        $team->users;
        $team->products;

        $user = $request->user();
        $otherUsers = [];
        foreach ($team->users as $value){
            if ($value->id !== $user->id) {
                $otherUsers[] = $value;
            }
        }

        Notification::send($otherUsers,new PushNotif(
            'Teamlist: liste mise à jour',
            $user->name . 'a ajouté un produit à la liste ' . $team->name));
        return $team;
    }

    public function delete($id, $product)
    {
        $product = Product::find($product);
        if (null === $product) {
            return response([
                "message" => "Produit inconnu"
            ], 404);
        }
        $product->delete();

        $team = Team::find($id);
        $team->users;
        $team->products;

        return $team;
    }
}
