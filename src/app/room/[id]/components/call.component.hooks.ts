import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useEffect} from "react";
import {DailyCall} from "@daily-co/daily-js";

export const makeOnDeleteClick = (router: AppRouterInstance, roomName: string) => {
    return async () => {
        const response = await fetch("http://localhost:3000/api", {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                roomId: roomName,
            }),
        });

        router.push('/')
    }
}

export const useJoinLeaveCall = (daily: DailyCall | null, roomUrl: string) => {
    useEffect(() => {
        if (!daily || !roomUrl) {
            return;
        }

        const joinCall = async () => {
            try {
                await daily.join({url: roomUrl});
                console.log('Call joined');
            } catch (e) {
                console.error('Failed to join call');
                console.error(e);
            }
        }
        joinCall();

        return () => {
            daily?.leave()
                .catch(console.error);
        }
    }, [daily, roomUrl]);
}
