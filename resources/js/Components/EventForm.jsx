import React, { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, usePages } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia'

 
export default function EventForm({ event, setEditing, isEventEdit=false }) { 
    
    const eventData = {
        detailed_description: event.detailed_description ? event.detailed_description : '',
    };

    const { data, setData, post, processing, reset, errors } = useForm(eventData);

    const submit = (e) => {
        e.preventDefault();

        if(isEventEdit){
            put(route('events.update', event.id), { onSuccess: () => setEditing(false) });
        }
        else{
            post(route('events.store'), { onSuccess: () => reset() });
        }
    };

    return (
        <form onSubmit={submit}>
            {/* <textarea value={data.detailed_description} onChange={e => setData('detailed_description', e.target.value)} className="mt-4 w-full text-gray-900 border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"></textarea> */}
            <textarea
                value={data.detailed_description}
                placeholder="Event description"
                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                onChange={e => setData('detailed_description', e.target.value)}
            ></textarea>
            <InputError detailed_description={errors.detailed_description} class="mt-2" />
            <div className="space-x-2">
                <PrimaryButton className="mt-4" disabled={processing}>Save</PrimaryButton>
                {
                    isEventEdit ?
                    <button className="mt-4" onClick={() => setEditing(false) && reset()}>Cancel</button>
                    : <></>
                }
            </div>
        </form>
    );
}