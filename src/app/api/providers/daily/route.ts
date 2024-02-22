import {NextRequest, NextResponse} from "next/server";
import DailyApiClient from "@/utils/clients/daily";
import {configFromEnv} from "@/utils/config";

export const GET = async (req: NextRequest) => {
    return NextResponse.json({ message: "Hello World" });
};

export const POST = async(req: NextRequest) => {
    const reqSync = await req.json();
    const roomId = reqSync?.roomId;
    const config = configFromEnv(process.env);
    const client = DailyApiClient.fromConfig(config.daily);

    if (!roomId) {
        return NextResponse.error();
    }

    try {
        const room = await client.getRoom({roomName: roomId});
        return NextResponse.json(room);
    } catch (e) {
        console.error(e);
    }

    try {
        const room = await client.createRoom({roomName: roomId})
        return NextResponse.json(room);
    } catch (e) {
        console.error(e);
    }


    return NextResponse.error();
}

export const DELETE = async(req: NextRequest) => {
    const reqSync = await req.json();
    const roomId = reqSync?.roomId;
    const config = configFromEnv(process.env);
    const client = DailyApiClient.fromConfig(config.daily);

    if (!roomId) {
        return NextResponse.error();
    }

    try {
        await client.deleteRoom({roomName: roomId});
        return NextResponse.json({message: "Room deleted"});
    } catch (e) {
        console.error('Cannot delete room');
        console.error(e);
    }

    return NextResponse.error();
}
