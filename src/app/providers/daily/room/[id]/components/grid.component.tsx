"use client";

import {memo, ReactNode, useMemo} from "react";
import {useDaily, useParticipantIds} from "@daily-co/daily-react";
import TileComponent from "@/app/providers/daily/room/[id]/components/tile.component";
import {DailyCall} from "@daily-co/daily-js";


const getParticipants = (daily: DailyCall | null, participantsIds: string[]): ReactNode[] => {
    if (!daily || !participantsIds) {
        return [];
    }

    if (!participantsIds.length) {
        return [];
    }

    const {local, ...rest} = daily.participants();
    const list = [local];
    for (const key in rest) {
        list.push(rest[key]);
    }

    return list.map((participant) => <TileComponent key={participant.user_id} participant={participant}/>);
}


const GridComponent = memo(() => {
    const participantsIds = useParticipantIds();
    const daily = useDaily();
    const participants = useMemo<ReactNode[]>(() => getParticipants(daily, participantsIds), [daily, participantsIds]);

    return (
        <div className={'grid grid-cols-2 xl:grid-cols-4 xxl:grid-cols-6 gap-4'}>
            {participants}
        </div>
    )
}, () => true);

GridComponent.displayName = 'GridComponent';
export default GridComponent;
