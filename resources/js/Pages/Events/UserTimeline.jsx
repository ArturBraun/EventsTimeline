import React, { useState } from 'react';
import Timeline from '@/Components/Timeline';
import { Link, Head } from '@inertiajs/inertia-react';
 
export default function AdminTimeline({props, events}) { 
    return (                
        <>
            <Head title="Welcome to timeline" />
            <div className=" items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
                <div className="text-right top-0 right-0 px-6 py-4 sm:block">
                    {props && props.auth.user ? (
                        <Link href={route('dashboard')} className="text-sm text-gray-700 dark:text-gray-500 underline">
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link href={route('login')} className="text-sm text-gray-700 dark:text-gray-500 underline">
                                Log in
                            </Link>

                            <Link
                                href={route('register')}
                                className="ml-4 text-sm text-gray-700 dark:text-gray-500 underline"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
                <Timeline events={events} forEditing={false} />
            </div>
        </>
    );
}