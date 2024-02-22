import {useMemo} from "react";
import Link from "next/link";

type Provider = {
    name: string;
    url: string;
}

const providersList: Provider[] = [
    {
        name: 'Daily',
        url: '/providers/daily'
    }
]

const ProvidersPage = () => {
    const providers = useMemo(() => providersList.map(provider => {
        return (
            <Link href={provider.url} key={provider.name} className={'rounded-md bg-gray-700 w-60 p-4'}>
                <div className={'text-center flex flex-col gap-2'}>
                    <div className={'text-center'}>{provider.name}</div>
                    <div className={'font-mono text-gray-500'}>{provider.url}</div>
                </div>
            </Link>
        )
    }), []);

    return (
        <div className={'flex flex-col justify-center h-screen w-full'}>
            <div className={'p-4 flex justify-center gap-4'}>
                {providers}
            </div>
        </div>
    )
};

export default ProvidersPage;
