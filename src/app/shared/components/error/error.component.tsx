"use client";

import {FC} from "react";

export type ErrorComponentProps = {
    code?: number;
    message?: string;
}

const ErrorComponent: FC<ErrorComponentProps> = (payload) => {
    const {code, message} = payload;

    return (
        <div>
            <h1>Error</h1>
            {
                code && <h1>{code}</h1>
            }
            {
                message && <h2>{message}</h2>
            }
        </div>
    )
};

export default ErrorComponent;
