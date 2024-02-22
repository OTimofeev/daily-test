"use client";

import React, {memo, useMemo} from "react";
import {DailyVideo} from "@daily-co/daily-react";
import {DailyParticipant} from "@daily-co/daily-js";
import ButtonIconComponent from "@/app/shared/components/ui/button/button.icon.component";
import {makeOnCameraClick, makeOnMicClick} from "@/app/providers/daily/room/[id]/components/tile.component.hooks";

const TileComponent = memo(({participant}: {
    participant: DailyParticipant,
}) => {

    const isCameraOn = useMemo(() => participant.tracks.video.state === 'playable', [participant]);
    const isMicOn = useMemo(() => participant.tracks.audio.state === 'playable', [participant]);

    const onCameraClick = makeOnCameraClick(participant);
    const onMicClick = makeOnMicClick(participant);

    const wrap = (child: any) => {
        return (
            <div className={'rounded-md overflow-hidden border border-gray-300 h-60 flex flex-col relative group'}>
                <div className={'h-60'}>{child}</div>
                <div
                    className={'absolute lef-0 top-0 h-full w-full flex flex-col justify-center opacity-0 group-hover:opacity-100 bg-gray-900 bg-opacity-50 transition cursor-pointer'}>
                    <div className={'flex justify-center gap-4'}>
                        <ButtonIconComponent
                            designType={isCameraOn ? 'primary' : 'danger'}
                            icon={isCameraOn ? 'videocam' : 'videocam_off'}
                            onClick={onCameraClick}
                        />
                        <ButtonIconComponent
                            designType={isMicOn ? 'primary' : 'danger'}
                            icon={isMicOn ? 'mic' : 'mic_off'}
                            onClick={onMicClick}
                        />
                    </div>
                </div>
            </div>
        )
    }

    if (!participant) {
        return wrap(
            <div className={'h-full flex flex-col justify-center'}>
                <div className={'text-center'}>No video</div>
            </div>
        );
    }

    return wrap(
        <DailyVideo
            className={'h-full w-full'}
            fit={'cover'}
            sessionId={participant.session_id}
            type={"video"}
            automirror/>
    );
}, () => true);

TileComponent.displayName = 'TileComponent';
export default TileComponent;

