import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/inertia-react';
import Event from '@/Components/Event';
import NewEvent from '@/Components/NewEvent';
 
export default function Index({ auth, events }) { 
    return (
        <AuthenticatedLayout 
            auth={auth}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Events Timeline</h2>}
        >
            <Head title="events" />
 
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <ol className="relative border-l border-gray-200 dark:border-gray-700">  
                    <NewEvent />

                    {events.map(event =>
                        <Event key={event.id} event={event} />
                    )}
                </ol>
            </div>
            
        </AuthenticatedLayout>
    );
}