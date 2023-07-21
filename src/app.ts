import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import router from "./app/routes/router";
import cookieParser from "cookie-parser";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app: Application = express();

// * Middleware
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1", router);
app.get("/", (req: Request, res: Response) => {
    res.send("Server is running");
});
app.use(globalErrorHandler);

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "Route not found",
        errorMessages: [
            {
                path: "",
                message: "Api not found",
            },
        ],
    });
});

export default app;
