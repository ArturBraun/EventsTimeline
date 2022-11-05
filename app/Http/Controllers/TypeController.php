<?php

namespace App\Http\Controllers;

use App\Models\Type;
use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Http\Response;

class TypeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Type::all();
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:128',
            'color' => 'required|string|max:7',
        ]);

        $savedType = Type::create([
            'name' => $request->name,
            'color' => $request->color,
        ]);
 
        return response(savedType, 200)
                ->header('Content-Type', 'application/json');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Type  $type
     * @return \Illuminate\Http\Response
     */
    public function show(Type $type)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Type  $type
     * @return \Illuminate\Http\Response
     */
    public function edit(Type $type)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Type  $type
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Type $type)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:128',
            'color' => 'required|string|max:7',
        ]);

        $typeFromDb = Type::find($type->id);
        $typeFromDb->name = $request->name;
        $typeFromDb->color = $request->color;
        $typeFromDb->save();

        return response('', 204);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Type  $type
     * @return \Illuminate\Http\Response
     */
    public function destroy(Type $type)
    {
        $events = Event::where('type_id', $type->id)
                ->get();
        
        if(!$events->isEmpty()){
            return response('Type cannot be deleted as there are existing events with this type', 400);
        }

        $typeFromDb = Type::find($type->id);
        $typeFromDb->delete();

        return response('', 204);
    }
}
