<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use App\Models\Team;


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
