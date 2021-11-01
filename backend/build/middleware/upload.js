"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var diskStorage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        console.log("multer", req.body);
        console.log("fieldName:", file.fieldname);
        cb(null, "./src/public/images");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now() + path_1.default.extname(file.originalname));
    },
});
var upload = multer_1.default({ storage: diskStorage });
exports.default = upload;
