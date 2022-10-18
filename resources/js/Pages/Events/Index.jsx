import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import Event from '@/Components/Event';
import EventForm from '@/Components/EventForm';
 
export default function Index({ auth, events }) {
    const [editing, setEditing] = useState(false);
    const emptyEvent = {
        detailed_description: '',
    }
 
    return (
        <AuthenticatedLayout 
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Events Timeline</h2>}
        >
            <Head title="events" />
 
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                    <EventForm event={emptyEvent} setEditing={setEditing} />
                </div>

                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {events.map(event =>
                        <Event key={event.id} event={event} />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}