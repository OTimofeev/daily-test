import fetch from 'node-fetch';
import {DailyConfig} from "@/utils/config";


export type RoomResponse = {
    id: string;
    name: string;
    api_created: string;
    privacy: 'public' | 'private';
    url: string;
    created_at: Date;
    config: {
        start_video_off?: boolean;
        exp?: number;
    }
}


class DailyApiClient {
    constructor(private apiKey: string) {
    }

    get headers(): Record<string, string> {
        return {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`
        }
    }

    _toUrl(...path: string[]): string {
        return `https://api.daily.co/v1/${path.join('/')}`;
    }

    /**
     * Create a new room
     */
    async createRoom(payload: {roomName: string}): Promise<RoomResponse>{
        const {roomName} = payload;
        const url = this._toUrl('rooms');
        const response = await fetch(url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({name: roomName})
        });

        if (!response.ok) {
            throw new Error('Failed to create room');
        }

        const json = await response.json();
        console.log(json);
        return json as RoomResponse;
    }

    async getRoom(payload: { roomName: string }): Promise<RoomResponse>{
        const {roomName} = payload;
        const url = this._toUrl('rooms', roomName);
        const response = await fetch(url, {
            method: 'GET',
            headers: this.headers
        });

        if (!response.ok) {
            throw new Error('Failed to get room');
        }

        const json = await response.json();
        return json as RoomResponse;
    }

    async deleteRoom(payload: { roomName: string }): Promise<void>{
        const {roomName} = payload;
        const url = this._toUrl('rooms', roomName);
        const response = await fetch(url, {
            method: 'DELETE',
            headers: this.headers
        });

        if (!response.ok) {
            throw new Error('Failed to delete room');
        }
    }

    /**
     * Get a new instance from config
     */
    static fromConfig(config: DailyConfig): DailyApiClient {
        if (!config.apiKey) {
            throw new Error('DAILY_API_KEY not found in env');
        }

        return new DailyApiClient(config.apiKey);
    }
}

export default DailyApiClient;
