"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var Author_1 = __importDefault(require("../controller/Author"));
var routes = express_1.default.Router();
routes.get("/", Author_1.default.get);
routes.post("/", Author_1.default.post);
routes.get("/:id", Author_1.default.getById);
routes.put("/:id", Author_1.default.update);
routes.delete("/:id", Author_1.default.delete);
exports.default = routes;
