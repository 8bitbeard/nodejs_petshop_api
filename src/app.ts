import express, { Request, Response, NextFunction, response } from "express";

import { router } from "./routes";

// import "./database";
// import createConnection from "./database";
import { createConnection } from "typeorm";
import { defaultConfiguration } from "../ormconfig";

createConnection(defaultConfiguration)

const app = express();

app.use(express.json());

app.use('/api', router);

app.use((err: Error, request: Request, respose: Response, next: NextFunction) => {
    if (err instanceof Error) {
        return response.status(400).json({
            error: err.message,
            backtrace: err.name
        })
    }

    return response.status(500).json({
        status: "error",
        message: "Internal Server Error"
    })
})

export { app };