"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageRouter = exports.ListRouter = exports.AuthorRouter = exports.BookRouter = exports.UserRouter = exports.AuthRouter = void 0;
var Auth_1 = require("./Auth");
Object.defineProperty(exports, "AuthRouter", { enumerable: true, get: function () { return __importDefault(Auth_1).default; } });
var User_1 = require("./User");
Object.defineProperty(exports, "UserRouter", { enumerable: true, get: function () { return __importDefault(User_1).default; } });
var Book_1 = require("./Book");
Object.defineProperty(exports, "BookRouter", { enumerable: true, get: function () { return __importDefault(Book_1).default; } });
var Author_1 = require("./Author");
Object.defineProperty(exports, "AuthorRouter", { enumerable: true, get: function () { return __importDefault(Author_1).default; } });
var List_1 = require("./List");
Object.defineProperty(exports, "ListRouter", { enumerable: true, get: function () { return __importDefault(List_1).default; } });
var Image_1 = require("./Image");
Object.defineProperty(exports, "ImageRouter", { enumerable: true, get: function () { return __importDefault(Image_1).default; } });
