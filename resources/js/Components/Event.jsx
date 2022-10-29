import React, { useState } from 'react';
import Dropdown from '@/Components/Dropdown';
import EventForm from '@/Components/EventForm'

 
export default function Event({ event }) { 
    const [editing, setEditing] = useState(false);
    const [detailed, setDetailed] = useState(false);

    return (
        <li className="mb-10 ml-6">
            <span className="flex absolute -left-3 justify-center items-center w-6 h-6 bg-blue-200 rounded-full ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                <svg aria-hidden="true" className="w-3 h-3 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"></path></svg>
            </span>
            { editing ?
                <EventForm event={event} setEditing={setEditing} isFormForEdit={true}/>
            : 
                <>
                    <h3 onClick={() => setDetailed(!detailed)} className="cursor-pointer mb-1 text-lg font-semibold text-gray-900 dark:text-white">{event.name}</h3>
                    <div className="top-0 right-0 grid grid-cols-8 gap-4">
                        <Dropdown>
                            <Dropdown.Trigger>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                                    </svg>
                                </button>
                            </Dropdown.Trigger>
                            <Dropdown.Content align="left">
                                <button className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-100 focus:bg-gray-100 transition duration-150 ease-in-out" onClick={() => setEditing(true)}>
                                    Edit
                                </button>
                                <Dropdown.Link as="button" href={route('events.destroy', event.id)} method="delete">
                                    Delete
                                </Dropdown.Link>
                            </Dropdown.Content>
                        </Dropdown>
                    </div>

                    <div className="cursor-pointer" onClick={() => setDetailed(!detailed)}>
                        <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{event.start_date ? `${event.start_date} - ` : ""} {event.end_date}</time>
                        <p className="text-base font-normal text-gray-500 dark:text-gray-400">{event.short_description}</p>
                        {
                            detailed ? 
                            <p className="mt-4 text-lg text-gray-900">{event.detailed_description}</p>
                            : <></>
                        }
                    </div>
                </>
            }
        </li>
    );
}