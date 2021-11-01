"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var User_1 = __importDefault(require("../controller/User"));
var verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
var UserRouter = express_1.Router();
UserRouter.get("/", verifyToken_1.default, User_1.default.get);
UserRouter.put("/:id", verifyToken_1.default, User_1.default.update);
// UserRouter.get("/:id", userCallback.getById)
UserRouter.delete("/:id", verifyToken_1.default, User_1.default.delete);
exports.default = UserRouter;
