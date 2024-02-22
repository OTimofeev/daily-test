"use client";

import Link from "next/link";

const Home = () => {
    return (
        <div className={'w-full h-screen flex flex-col justify-center'}>
            <div className={'w-full flex justify-center'}>
                <Link href={'/providers'}>To Providers</Link>
            </div>
        </div>
    );
};

export default Home;
