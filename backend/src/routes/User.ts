import { Router } from "express";

import UserCallback from "../controller/User";

import verifyToken from "../middleware/verifyToken";

const UserRouter = Router();

UserRouter.get("/", verifyToken, UserCallback.get);

UserRouter.put("/:id", verifyToken, UserCallback.update);

// UserRouter.get("/:id", userCallback.getById)

UserRouter.delete("/:id", verifyToken, UserCallback.delete);

export default UserRouter;
