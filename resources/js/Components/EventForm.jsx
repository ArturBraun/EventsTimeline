import React, { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, usePages } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {toDateFromStr, getFormattedDate} from '../utils/common-functions'

 
export default function EventForm({ event, setEditing, isEventEdit=false }) { 
    
    const eventData = {
        name: event.name ? event.name : '',
        short_description: event.short_description ? event.short_description : '',
        detailed_description: event.detailed_description ? event.detailed_description : '',
        start_date: event.start_date ? toDateFromStr(event.start_date) :  new Date(),
        end_date: event.end_date ? toDateFromStr(event.end_date) : new Date(),
    };
    const { data, setData, put, processing, reset, errors } = useForm(eventData);

    const submit = (e) => {
        if(data.start_date){
            data.start_date = getFormattedDate(data.start_date);
        }
        data.end_date = getFormattedDate(data.end_date);

        e.preventDefault();
        if(isEventEdit){
            Inertia.put(`/events/${event.id}`, data, { onSuccess: () => setEditing(false) });
        }
        else{
            Inertia.post('/events', data, { onSuccess: () => reset() });
        }
    };

    return (
        <form onSubmit={submit}>
            <textarea
                value={data.name}
                placeholder="Name"
                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                onChange={e => setData('name', e.target.value)}
            ></textarea>
            <DatePicker 
                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm" 
                selected={data.start_date} 
                onChange={(date) => setData('start_date', date)} 
                dateFormat="yyyy-MM-dd"
            />
            <DatePicker 
                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm" 
                selected={data.end_date} 
                onChange={(date) => setData('end_date', date)} 
                dateFormat="yyyy-MM-dd"
            />
            <textarea
                value={data.short_description}
                placeholder="Short description"
                className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                onChange={e => setData('short_description', e.target.value)}
            ></textarea>
            <textarea
                value={data.detailed_description}
                placeholder="Detailed description"
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