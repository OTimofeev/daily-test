import {DailyParticipant} from "@daily-co/daily-js";

export const makeOnCameraClick = (participant: DailyParticipant) => {
    return () => {
        if (participant.local) {
            return;
        }

        if (participant.tracks.video.state === 'playable') {
        } else {
        }
    }
}

export const makeOnMicClick = (participant: DailyParticipant) => {
    return () => {
        if (participant.local) {
            return;
        }

        if (participant.tracks.video.state === 'playable') {
        } else {
        }
    }
}
