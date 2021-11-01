"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.ListModel = exports.AuthorModel = exports.BookModel = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var Book_1 = __importDefault(require("./Book"));
var Author_1 = __importDefault(require("./Author"));
var List_1 = __importDefault(require("./List"));
var User_1 = __importDefault(require("./User"));
var BookModel = mongoose_1.default.model("Book", Book_1.default);
exports.BookModel = BookModel;
var AuthorModel = mongoose_1.default.model("Author", Author_1.default);
exports.AuthorModel = AuthorModel;
var ListModel = mongoose_1.default.model("List", List_1.default);
exports.ListModel = ListModel;
var UserModel = mongoose_1.default.model("User", User_1.default);
exports.UserModel = UserModel;
