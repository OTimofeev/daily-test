"use client";

import {DailyProvider, useCallObject} from "@daily-co/daily-react";
import {FC, PropsWithChildren} from "react";
import {useJoinLeaveCall} from "@/app/providers/daily/room/[id]/components/call.component.hooks";


export type CallProviderProps = {
    roomUrl: string;
}

const CallProvider: FC<PropsWithChildren<CallProviderProps>> = ({roomUrl, children}) => {
    const callObject = useCallObject({
        options: {
            url: roomUrl,
            lang: 'en',
        },
    });
    useJoinLeaveCall(callObject, roomUrl);


    return (
        <DailyProvider callObject={callObject}>
            {children}
        </DailyProvider>
    )
}

export default CallProvider;
