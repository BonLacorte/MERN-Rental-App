import { Router } from "express";
import { registerHandler, loginhandler, logoutHandler, refreshHandler, verifyEmailHandler, sendPasswordResetHandler, resetPasswordHandler } from "../controllers/auth.controller";

const authRoutes = Router();

// prefix: /auth

authRoutes.post("/register", registerHandler)
authRoutes.post("/login", loginhandler)
authRoutes.get("/refresh", refreshHandler)
authRoutes.get("/logout", logoutHandler)
authRoutes.get("/email/verify/:code", verifyEmailHandler)
authRoutes.post("/password/forgot", sendPasswordResetHandler)
authRoutes.post("/password/reset", resetPasswordHandler)



export default authRoutes;