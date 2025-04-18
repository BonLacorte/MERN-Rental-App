import "dotenv/config";
import express, { Request, Response } from "express";
import cors from "cors";
import connectDB from "./config/db";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";
import cookieParser from "cookie-parser";
import errorHandler from "./middleware/errorHandler";
import catchErrors from "./utils/catchErrors";
import { OK } from "./constants/http";
import authRoutes from "./routes/auth.route";
import authenticate from "./middleware/authenticate";
import userRoutes from "./routes/user.route";
import sessionRoutes from "./routes/session.route";

const app = express();

app.use(cors({
    origin: APP_ORIGIN,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get(
    "/", (req, res, next) => {
        res.status(OK).json({
        status: "Hello World"
    })
    }
)

app.use("/auth", authRoutes);

// protected routes
app.use('/user', authenticate, userRoutes)
app.use('/sessions', authenticate, sessionRoutes)

app.use(errorHandler);

app.listen(PORT, async () => {
    console.log(`Listening on port ${PORT} in ${NODE_ENV}`);
    await connectDB();
});