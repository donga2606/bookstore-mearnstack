"use strict";
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
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv").config();
var secretKey = process.env.TOKEN_SECRET_KEY;
var bcrypt = require("bcrypt");
var AuthCallback = /** @class */ (function () {
    function AuthCallback() {
    }
    AuthCallback.register = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var oldUser, newUser, payload, token, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!req.body.email || !req.body.password) {
                            return [2 /*return*/, res
                                    .status(404)
                                    .json({ error: "Please enter a valid email or password" })];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, models_1.UserModel.findOne({ email: req.body.email })];
                    case 2:
                        oldUser = _a.sent();
                        if (oldUser) {
                            return [2 /*return*/, res.status(409).json({
                                    error: "User Already Exist. Please login or choose another email",
                                })];
                        }
                        newUser = new models_1.UserModel(req.body);
                        return [4 /*yield*/, newUser.save()];
                    case 3:
                        payload = _a.sent();
                        token = jsonwebtoken_1.default.sign({ user_id: newUser._id }, secretKey);
                        console.log(token);
                        return [2 /*return*/, res.json({ success: true, data: payload, token: token })];
                    case 4:
                        err_1 = _a.sent();
                        res.status(500).json({ error: err_1 });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AuthCallback.logIn = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, user, _b, token, err_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 4, , 5]);
                        _a = req.body, email = _a.email, password = _a.password;
                        if (!(email && password)) {
                            return [2 /*return*/, res.status(404).json({ error: "Invalid email or password" })];
                        }
                        return [4 /*yield*/, models_1.UserModel.findOne({ email: email }).populate({
                                path: "cart.orderBooks.book",
                            })];
                    case 1:
                        user = _c.sent();
                        _b = user;
                        if (!_b) return [3 /*break*/, 3];
                        return [4 /*yield*/, bcrypt.compare(password, user.password)];
                    case 2:
                        _b = (_c.sent());
                        _c.label = 3;
                    case 3:
                        if (_b) {
                            token = jsonwebtoken_1.default.sign({ user_id: user._id }, secretKey, {
                                expiresIn: "1d",
                            });
                            return [2 /*return*/, res.status(200).json({ success: true, data: user, token: token })];
                        }
                        return [2 /*return*/, res.status(400).send({ error: "wrong email or password" })];
                    case 4:
                        err_2 = _c.sent();
                        res.status(500).json({ error: err_2 });
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AuthCallback.accessToken = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var payload, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, req.user
                            .populate({ path: "cart.orderBooks.book" })
                            .execPopulate()];
                    case 1:
                        payload = _a.sent();
                        token = jsonwebtoken_1.default.sign({ user_id: req.user._id }, secretKey);
                        return [2 /*return*/, res.status(200).json({ success: true, data: req.user, token: token })];
                }
            });
        });
    };
    return AuthCallback;
}());
exports.default = AuthCallback;
