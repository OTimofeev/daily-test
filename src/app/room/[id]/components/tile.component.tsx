"use client";

import {memo} from "react";
import {DailyVideo} from "@daily-co/daily-react";
import {DailyParticipant} from "@daily-co/daily-js";

const TileComponent = memo(({participant}: {
    participant: DailyParticipant,
}) => {

    const wrap = (child: any) => {
        return (
            <div className={'rounded-md overflow-hidden border border-gray-300'}>
                {child}
            </div>
        )
    }

    if (!participant) {
        return wrap(<div>No video</div>);
    }

    return wrap(<DailyVideo sessionId={participant.session_id} type={"video"} automirror/>);
}, (prevProps, nextProps) => prevProps.participant.user_id === nextProps.participant.user_id);

TileComponent.displayName = 'TileComponent';
export default TileComponent;

