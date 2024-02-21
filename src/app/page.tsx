"use client";

import {useRef, useState} from "react";
import Link from "next/link";

const Home = () => {
    const [roomId, setRoomId] = useState<string | null>(null);
    const ref = useRef<HTMLAnchorElement>(null);

    return (
        <div className={'w-full h-screen flex flex-col justify-center'}>
            <div className={'w-full flex justify-center'}>
                <div className={'w-1/2 p-4 flex flex-col gap-4 content-center'}>
                    <input type="text" placeholder={'Room id'} value={roomId || ""}
                           className={'text-black p-2 w-full rounded-md'}
                           onKeyDown={(e) => {
                               if (e.key === 'Enter') {
                                   ref && ref.current && ref.current.click();
                               }
                           }}
                           onChange={(e) => setRoomId(e.target.value)}/>
                    <div className={'text-center'}>
                        <Link ref={ref} href={`/room/${roomId}`} hidden={!roomId}>
                            Join room
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Home;
