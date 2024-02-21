"use client";

import {RoomResponse} from "@/utils/clients/daily";
import {useRouter} from "next/navigation";
import {useDaily} from "@daily-co/daily-react";
import {DailyConfig} from "@/utils/config";
import {
    makeOnDeleteClick,
    useJoinLeaveCall,
} from "@/app/room/[id]/components/call.component.hooks";
import React from "react";
import ButtonComponent from "@/app/shared/components/ui/button/button.component";
import GridComponent from "@/app/room/[id]/components/grid.component";

type CallComponentProps = {
    room: RoomResponse;
    config: DailyConfig;
}

const CallComponent = ({room, config}: CallComponentProps) => {
    const router = useRouter();
    const daily = useDaily();
    const onDeleteClick = makeOnDeleteClick(router, room.name);
    const toggleVideo = () => {
        if (!daily) {
            return;
        }

        const localVideo = daily.localVideo();
        if (!localVideo) {
            return;
        }

        daily.setLocalVideo(!localVideo);
    }

    const toggleAudio = () => {
        // pass
    }

    useJoinLeaveCall(daily, room.url);

    return (
        <div className={'p-4'}>
            <div className={'w-full flex flex-col gap-4'}>

                <div className={'text-center'}>{room.url}</div>
                <div className={'rounded-md min-h-[52vh]'}>
                    <GridComponent />
                </div>
                <div className={'flex justify-center gap-4'}>
                    <ButtonComponent text={'toggle video'} onClick={toggleVideo} designType={'primary'}/>
                    <ButtonComponent text={'Toggle audio'} onClick={toggleAudio} designType={'primary'}/>
                    <span />
                    <ButtonComponent text={'Delete'} onClick={onDeleteClick} designType={'danger'}/>
                </div>
            </div>
        </div>
    )
};

export default CallComponent;
