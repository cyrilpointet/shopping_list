<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        Schema::disableForeignKeyConstraints();
        DB::table('teams_users')->truncate();
        $this->call(UsersTableSeeder::class);
        $this->call(TeamSeeder::class);
        $this->call(ProductSeeder::class);
        Schema::enableForeignKeyConstraints();
    }
}
