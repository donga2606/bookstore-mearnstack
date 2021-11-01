"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var Auth_1 = __importDefault(require("../controller/Auth"));
var verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
var authRouter = express_1.Router();
authRouter.post("/register", Auth_1.default.register);
authRouter.post("/login", Auth_1.default.logIn);
authRouter.get("/access-token", verifyToken_1.default, Auth_1.default.accessToken);
exports.default = authRouter;
