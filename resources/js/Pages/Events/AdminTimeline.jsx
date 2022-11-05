import React, { useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/inertia-react";
import Timeline from "@/Components/Timeline";

export default function AdminTimeline({ auth, events }) {
    return (
        <AuthenticatedLayout
            auth={auth}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Events Timeline
                </h2>
            }
        >
            <Head title="events" />
            <Timeline events={events} forEditing={true} />
        </AuthenticatedLayout>
    );
}
