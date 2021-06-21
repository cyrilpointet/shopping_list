<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureIsTeamMember
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        $user = $request->user();
        $user->teams;
        $teams = $user->teams()->where('team_id', $request->route('id'))->get();
        if (0 === count($teams)) {
            return response([
                'message' => ['Non membre du groupe']
            ], 401);
        }
        return $next($request);
    }
}
