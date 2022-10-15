import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, Head } from '@inertiajs/inertia-react';
import Event from '@/Components/Event';
 
export default function Index({ auth, events }) {
    const { data, setData, post, processing, reset, errors } = useForm({
        detailed_description: '',
    });
 
    const submit = (e) => {
        e.preventDefault();
        post(route('events.store'), { onSuccess: () => reset() });
    };
 
    return (
        <AuthenticatedLayout auth={auth}>
            <Head title="events" />
 
            <div className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
                <form onSubmit={submit}>
                    <textarea
                        value={data.detailed_description}
                        placeholder="What's on your mind?"
                        className="block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
                        onChange={e => setData('detailed_description', e.target.value)}
                    ></textarea>
                    <InputError detailed_description={errors.detailed_description} className="mt-2" />
                    <PrimaryButton className="mt-4" disabled={processing}>Save event</PrimaryButton>
                </form>

                <div className="mt-6 bg-white shadow-sm rounded-lg divide-y">
                    {events.map(event =>
                        <Event key={event.id} event={event} />
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}