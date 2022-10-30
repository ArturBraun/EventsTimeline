import React, { useState } from 'react';
import Timeline from '@/Components/Timeline';
import { Link, Head } from '@inertiajs/inertia-react';
 
export default function AdminTimeline({props, events}) { 
    return (                
        <>
            <Head title="Welcome to timeline" />
            <div className="relative flex items-top justify-center min-h-screen bg-gray-100 dark:bg-gray-900 sm:items-center sm:pt-0">
                <div className="fixed top-0 right-0 px-6 py-4 sm:block">
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

                <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
                    <div className="mt-8">
                        <Timeline events={events} forEditing={false} />
                        <div className="grid ">
                            <div className="p-6">
                                <div className="ml-12 mt-2">
                                    
                                    <div className="mt-2">
                                        Laravel has wonderful, thorough documentation covering every aspect of the
                                        framework. Whether you are new to the framework or have previous experience with
                                        Laravel, we recommend reading all of the documentation from beginning to end.
                                    </div>
                                </div>
                            </div>    
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}