import cors from "cors";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import "reflect-metadata";
import "dotenv/config";
import swaggerUi from "swagger-ui-express";

import "@shared/container";

import { AppError } from "@shared/errors/AppError";
import createConnection from "@shared/infra/typeorm";

import swaggerFile from "../../../swagger.json";
import { router } from "./routes";

createConnection();
const app = express();

app.use(express.json());

app.use(cors());
app.use("/api/v1", router);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        code: err.code,
        message: err.message,
        details: err.details,
      });
    }

    return response.status(500).json({
      code: "INTERNAL_SERVER_ERROR",
      message: "Internal Server Error",
      details: ["Internal Server Error"],
    });
  }
);

export { app };
