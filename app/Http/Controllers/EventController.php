<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $view = 'Events/UserTimeline';
        
        if (Auth::check()) {
            $view = 'Events/AdminTimeline';
        }
        
        return Inertia::render($view, [
            'events' => 
                Event::with('type:id,name,color')
                    ->orderBy('end_date', 'DESC')
                    ->orderBy('created_at', 'DESC')
                    ->get(),
        ]);
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
            'name' => 'required|string|min:1|max:128',
            'short_description' => 'required|string|min:1|max:512',
            'detailed_description' => 'required|string|min:1|max:1024',
            'start_date' => 'date_format:Y-m-d|before:end_date',
            'end_date' => 'required|date_format:Y-m-d',
            'type_id' => 'integer|min:1|nullable',
        ]);

        $event = new Event;
        $event->name = $request->name;
        $event->short_description = $request->short_description;
        $event->detailed_description = $request->detailed_description;
        $event->start_date = $request->start_date;
        $event->end_date = $request->end_date;
        $event->type_id = $request->type_id;
        $event->save();
 
        return redirect(route('events.index'));
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function show(Event $event)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function edit(Event $event)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Event $event)
    {
        $validated = $request->validate([
            'name' => 'required|string|min:1|max:128',
            'short_description' => 'required|string|min:1|max:512',
            'detailed_description' => 'required|string|min:1|max:1024',
            'start_date' => 'date_format:Y-m-d|before:end_date',
            'end_date' => 'required|date_format:Y-m-d',
            'type_id' => 'integer|min:1|nullable',
        ]);

        $eventFromDb = Event::find($event->id);
        $eventFromDb->name = $request->name;
        $eventFromDb->short_description = $request->short_description;
        $eventFromDb->detailed_description = $request->detailed_description;
        $eventFromDb->start_date = $request->start_date;
        $eventFromDb->end_date = $request->end_date;
        $eventFromDb->type_id = $request->type_id;
        $eventFromDb->save();

        return redirect(route('events.index'));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function destroy(Event $event)
    {
        $eventFromDb = Event::find($event->id);
        $eventFromDb->delete();

        return redirect(route('events.index'));
    }
}
