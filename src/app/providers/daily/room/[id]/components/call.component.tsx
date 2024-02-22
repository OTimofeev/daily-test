"use client";

import {RoomResponse} from "@/utils/clients/daily";
import {useRouter} from "next/navigation";
import {useDaily} from "@daily-co/daily-react";
import {DailyConfig} from "@/utils/config";
import {
    makeOnCopyClick,
    makeOnDeleteClick,
    useJoinLeaveCall,
} from "@/app/providers/daily/room/[id]/components/call.component.hooks";
import React from "react";
import ButtonComponent from "@/app/shared/components/ui/button/button.component";
import GridComponent from "@/app/providers/daily/room/[id]/components/grid.component";
import ButtonIconComponent from "@/app/shared/components/ui/button/button.icon.component";

type CallComponentProps = {
    room: RoomResponse;
    config: DailyConfig;
}

const CallComponent = ({room, config}: CallComponentProps) => {
    const router = useRouter();
    const daily = useDaily();
    const onDeleteClick = makeOnDeleteClick(router, room.name);
    const onCopyClick = makeOnCopyClick(room.url);

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
        <div className={'p-4 h-screen'}>
            <div className={'w-full flex flex-col gap-4 h-full'}>
                <div className={'text-center flex flex-col justify-center'}>
                    <div className="flex justify-center gap-4 align-middle">
                        <span className={'align-middle'}>{room.url}</span>
                        <ButtonIconComponent size={'sm'} transparent={true} onClick={onCopyClick} designType={'secondary'} icon={'content_copy'}/>
                    </div>
                </div>
                <div className={'rounded-md flex flex-shrink h-full overflow-auto'}>
                    <GridComponent/>
                </div>
                <div className={'h-16 flex-col justify-center'}>
                    <div className={'flex justify-center gap-4'}>
                        <ButtonComponent text={'toggle video'} onClick={toggleVideo} designType={'primary'}/>
                        <ButtonComponent text={'Toggle audio'} onClick={toggleAudio} designType={'primary'}/>
                        <span/>
                        <ButtonComponent text={'Delete'} onClick={onDeleteClick} designType={'danger'}/>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CallComponent;
