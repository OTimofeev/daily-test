import React from "react";
import CallComponent from "@/app/room/[id]/components/call.component";
import {RoomResponse} from "@/utils/clients/daily";
import ErrorComponent from "@/app/shared/components/error/error.component";
import {configFromEnv} from "@/utils/config";
import CallProvider from "@/app/room/[id]/components/call.provider";

type PageProps = {
    params: {
        id: string;
    }
}

const RoomIndexPage = async ({params: {id}}: PageProps) => {
    const config = configFromEnv(process.env);
    const roomResponse = await fetch("http://localhost:3000/api", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            roomId: id
        }),
    });

    if (!roomResponse.ok) {
        return <ErrorComponent code={400} message={(await roomResponse.json())?.toString()} />
    }

    const content = await roomResponse.json();
    const room = content as RoomResponse;

    return (
        <CallProvider roomUrl={room.url}>
            <CallComponent room={room} config={config.daily} />
        </CallProvider>
    )
}

export default RoomIndexPage;
