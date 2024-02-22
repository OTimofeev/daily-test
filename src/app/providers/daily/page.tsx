"use client";

import {useRef, useState} from "react";
import Link from "next/link";

const DailyPage = () => {
    const [roomId, setRoomId] = useState<string | null>(null);
    const ref = useRef<HTMLAnchorElement>(null);

    return (
        <div className={'w-full h-screen flex flex-col justify-center'}>
            <div className={'w-full flex justify-center'}>
                <div className={'w-1/2 p-4 flex flex-col gap-4 content-center'}>
                    <div className={'text-center text-gray-400'}>
                        Enter room id (can be random)
                    </div>
                    <input type="text" placeholder={'Room id'} value={roomId || ""}
                           className={'text-black p-2 w-full rounded-md'}
                           onKeyDown={(e) => {
                               if (e.key === 'Enter') {
                                   ref && ref.current && ref.current.click();
                               }
                           }}
                           onChange={(e) => setRoomId(e.target.value)}/>
                    <div className={'text-center h-8'}>
                        <Link ref={ref} href={`/providers/daily/room/${roomId}`} hidden={!roomId}>
                            Click to Join the room
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default DailyPage;
