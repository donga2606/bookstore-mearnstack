import { Router } from "express";
import AuthCallback from "../controller/Auth";
import verifyToken from "../middleware/verifyToken";

const authRouter = Router();

authRouter.post("/register", AuthCallback.register);
authRouter.post("/login", AuthCallback.logIn);
authRouter.get("/access-token", verifyToken, AuthCallback.accessToken);

export default authRouter;


