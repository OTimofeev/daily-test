"use client";

import {memo, ReactNode, useMemo} from "react";
import {useDaily, useParticipantIds} from "@daily-co/daily-react";
import TileComponent from "@/app/room/[id]/components/tile.component";
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

    const sortedList = list
        .toSorted((a, b) => a.local ? -1 : 1);

    return sortedList.map((participant) => <TileComponent key={participant.user_id} participant={participant}/>);
}


const GridComponent = memo(() => {
    const participantsIds = useParticipantIds();
    const daily = useDaily();
    const participants = useMemo<ReactNode[]>(() => {
        return getParticipants(daily, participantsIds);
    }, [daily, participantsIds]);

    return (
        <div className={'grid grid-cols-3 gap-4'}>
            {participants}
        </div>
    )
}, () => true);

GridComponent.displayName = 'GridComponent';
export default GridComponent;
