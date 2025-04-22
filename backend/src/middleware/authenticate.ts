import { RequestHandler } from "express";
import appAssert from "../utils/appAssert";
import AppErrorCode from "../constants/appErrorCode";
import { UNAUTHORIZED } from "../constants/http";
import { verifyToken } from "../utils/jwt";
import mongoose from "mongoose";

// declare global {
//   namespace Express {
//     interface Request {
//       userId: string;
//       sessionId: string;
//     }
//   }
// }

// wrap with catchErrors() if you need this to be async
const authenticate: RequestHandler = (req, res, next) => {
  const accessToken = req.cookies.accessToken as string | undefined;
  appAssert(
    accessToken,
    UNAUTHORIZED,
    "Not authorized",
    AppErrorCode.InvalidAccessToken
  );

  const { error, payload } = verifyToken(accessToken);
  appAssert(
    payload,
    UNAUTHORIZED,
    error === "jwt expired" ? "Token expired" : "Invalid token",
    AppErrorCode.InvalidAccessToken
  );
//   console.log(req.userId);
    (req as any).userId = payload.userId as mongoose.Types.ObjectId;
(req as any).sessionId = payload.sessionId as mongoose.Types.ObjectId;
    next();
};

export default authenticate;
