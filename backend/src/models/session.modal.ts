import mongoose from "mongoose"
import { thirtyDaysFromNow } from "../utils/date";

export interface SessionDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    userAgent?: string;
    expiresAt: Date;
    createdAt: Date;
}

const sessionSchema = new mongoose.Schema<SessionDocument>({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        index: true, 
        ref: "User" 
    },
    userAgent: { type: String },
    expiresAt: { type: Date, default: thirtyDaysFromNow },
    createdAt: { type: Date, required: true, default: Date.now },
})

const SessionModel = mongoose.model<SessionDocument>("Session", sessionSchema, "sessions");
export default SessionModel;