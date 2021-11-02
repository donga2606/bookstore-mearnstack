"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var models_1 = require("../models");
var models_2 = require("../models");
var printQueryMongoose_1 = __importDefault(require("../utils/printQueryMongoose"));
var useInCallBack_1 = require("../utils/useInCallBack");
require("dotenv").config();
var AuthorCallback = /** @class */ (function () {
    function AuthorCallback() {
    }
    AuthorCallback.get = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, useInCallBack_1.getAllRecords(models_1.AuthorModel, "books")];
                    case 1:
                        payload = _a.sent();
                        useInCallBack_1.setHeader(res, payload, "author");
                        return [2 /*return*/, res.json({
                                success: true,
                                data: payload,
                            })];
                    case 2:
                        err_1 = _a.sent();
                        return [2 /*return*/, res.status(500)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthorCallback.getById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, payload, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        _id = req.params.id;
                        return [4 /*yield*/, models_1.AuthorModel.findById(_id)
                                .populate("books")
                                .lean({ virtuals: true })];
                    case 1:
                        payload = _a.sent();
                        return [2 /*return*/, res.json({
                                success: true,
                                data: payload,
                            })];
                    case 2:
                        err_2 = _a.sent();
                        return [2 /*return*/, res.status(500)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthorCallback.post = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, name, about, books, payload, _i, _b, book, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 6, , 7]);
                        _a = req.body, name = _a.name, about = _a.about;
                        books = req.body.books_ids;
                        return [4 /*yield*/, models_1.AuthorModel.create({
                                name: name,
                                about: about,
                                books: books,
                            })];
                    case 1:
                        payload = _d.sent();
                        console.log("payload post author:", payload);
                        _i = 0, _b = payload.get("books");
                        _d.label = 2;
                    case 2:
                        if (!(_i < _b.length)) return [3 /*break*/, 5];
                        book = _b[_i];
                        return [4 /*yield*/, models_2.BookModel.findOneAndUpdate({ _id: book._id }, { author: payload._id }, { new: true }, printQueryMongoose_1.default)];
                    case 3:
                        _d.sent();
                        _d.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, res.json({
                            success: true,
                            data: payload,
                        })];
                    case 6:
                        _c = _d.sent();
                        return [2 /*return*/, res.status(500)];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AuthorCallback.update = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, payload, _i, _a, bookID, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 6, , 7]);
                        _id = req.params.id;
                        return [4 /*yield*/, models_1.AuthorModel.findOneAndUpdate({
                                _id: _id,
                            }, __assign(__assign({}, req.body), { books: req.body.books_ids }), { new: true }, printQueryMongoose_1.default)];
                    case 1:
                        payload = _c.sent();
                        if (!payload) return [3 /*break*/, 5];
                        _i = 0, _a = payload.books;
                        _c.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        bookID = _a[_i];
                        return [4 /*yield*/, models_2.BookModel.findOneAndUpdate({ _id: bookID }, { author: payload._id }, { new: true })];
                    case 3:
                        _c.sent();
                        _c.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, res.json({
                            success: true,
                            data: payload,
                        })];
                    case 6:
                        _b = _c.sent();
                        return [2 /*return*/, res.status(500)];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    AuthorCallback.delete = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _id, payload, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        _id = req.params.id;
                        return [4 /*yield*/, models_1.AuthorModel.findByIdAndRemove(_id)];
                    case 1:
                        payload = _a.sent();
                        return [2 /*return*/, res.json({ success: true, data: payload })];
                    case 2:
                        err_3 = _a.sent();
                        return [2 /*return*/, res.status(500)];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return AuthorCallback;
}());
exports.default = AuthorCallback;
