import { Request, Response } from "express";
import catchErrors from "../utils/catchErrors";
import { z } from "zod";
import { createAccount, loginUser, refreshUserAccessToken, resetPassword, sendPasswordResetEmail, verifyEmail } from "../services/auth.service";
import { CREATED, OK, UNAUTHORIZED } from "../constants/http";
import { clearAuthCookies, getAccessTokenCookieOptions, getRefreshTokenCookieOptions, setAuthCookies } from "../utils/cookies";
import { emailSchema, loginSchema, registerSchema, resetPasswordSchema, verificationCodeSchema } from "./auth.schemas";
import { AccessTokenPayload, verifyToken } from "../utils/jwt";
import SessionModel from "../models/session.modal";
import appAssert from "../utils/appAssert";

export const registerHandler = catchErrors(async (req, res) => {
    // validate request
    const request = registerSchema.parse({
        ...req.body,
        userAgent: req.headers["user-agent"]
    });

    // call service
    const { user, accessToken, refreshToken } = await createAccount(request);

    // return response
    setAuthCookies({ res, accessToken, refreshToken })
        .status(CREATED)
        .json(user);
})

export const loginhandler = catchErrors(async (req, res) => {
    const request = loginSchema.parse({
        ...req.body,
        userAgent: req.headers["user-agent"]
    })

    const { accessToken, refreshToken } = await loginUser(request)

    setAuthCookies({ res, accessToken, refreshToken })
    res.status(OK).json({
        message: "Logged in successfully",
    });
})

export const logoutHandler = catchErrors(async (req, res) => {
    const accessToken = req.cookies.accessToken;
    const { payload } = verifyToken(accessToken)

    if (payload) {
        await SessionModel.findByIdAndDelete(payload.sessionId)
    }

    clearAuthCookies(res)
    res.status(OK).json({
        message: "Logged out successfully"
    });
})

export const refreshHandler = catchErrors(async (req, res) => {
    const refreshToken = req.cookies.refreshToken as string|undefined;
    appAssert(refreshToken, UNAUTHORIZED, "Missing refresh token");

    const {accessToken, newRefreshToken} = await refreshUserAccessToken(refreshToken);

    if (refreshToken) {
        res.cookie("refreshToken", newRefreshToken, getRefreshTokenCookieOptions())
    }

    res.status(OK).cookie("accessToken", accessToken, getAccessTokenCookieOptions()).json({message: "Access Token refreshed successfully"})
})

export const verifyEmailHandler = catchErrors(async (req, res) => {
    const verificationCode = verificationCodeSchema.parse(req.params.code);

    await verifyEmail(verificationCode);

    res.status(OK).json({
        message: "Email verified successfully"
    });
})


export const sendPasswordResetHandler = catchErrors(async (req, res) => {
    const email = emailSchema.parse(req.body.email)

    await sendPasswordResetEmail(email)

    res.status(OK).json({ message: "Password reset email sent successfully" })

})

export const resetPasswordHandler = catchErrors(async (req, res) => {
    const request = resetPasswordSchema.parse(req.body);
  
    await resetPassword(request);
  
    clearAuthCookies(res).status(OK).json({ message: "Password was reset successfully" });
  });

