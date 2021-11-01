"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
// import upload from "../middleware/multer";
var router = express_1.default.Router();
// router.post("/book", upload.single("image"), (req, res) => {
//   console.log("upload images");
//   console.log(req.file?.filename);
//   res.send("upload success");
// });
// router.post("/books", upload.array("image", 10), (req, res) => {
//   console.log("upload many images books");
//   res.send("upload success");
// });
// router.post("/banner", upload.array("image", 3), (req, res) => {
//   console.log("upload many images banners");
//   res.send("upload success");
// });
// router.post("/banner", upload.array("image", 3), (req, res) => {
//   console.log("upload many images logo list");
//   res.send("upload success");
// });
exports.default = router;
