import mongoose from "mongoose";
import VerificationcodeType from "../constants/verificationCodeTypes";

export interface VerificationCodeDocument extends mongoose.Document {
    userId: mongoose.Types.ObjectId;
    type: VerificationcodeType;
    expiresAt: Date;
    createdAt: Date;
}

const verificationCodeSchema = new mongoose.Schema<VerificationCodeDocument>(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true, index: true, ref: "User" },
        type: { type: String, required: true },
        expiresAt: { type: Date, required: true },
        createdAt: { type: Date, required: true, default: Date.now },
    },
    {   
        timestamps: true,
    }
);

const VerificationCodeModel = mongoose.model<VerificationCodeDocument>(
    "VerificationCode", 
    verificationCodeSchema,
    "verification_codes"
);
export default VerificationCodeModel;