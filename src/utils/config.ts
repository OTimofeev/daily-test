export type DatabaseConfig = {
    path: string;
}

export type DailyConfig = {
    apiKey: string;
    publicApiKey: string;
}

export type AppConfig = {
    database: DatabaseConfig;
    daily: DailyConfig;
}

export const configFromEnv = (env: NodeJS.ProcessEnv): AppConfig => {
    return {
        database: {
            path: env.DATABASE_PATH || "default.db"
        },
        daily: {
            apiKey: env.DAILY_API_KEY || "",
            publicApiKey: env.NEXT_PUBLIC_DAILY_API_KEY || ""
        }
    };
}
