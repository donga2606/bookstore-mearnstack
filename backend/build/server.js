"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var connectDatabase_1 = __importDefault(require("./utils/connectDatabase"));
var cors_1 = __importDefault(require("cors"));
var morgan_1 = __importDefault(require("morgan"));
var path_1 = __importDefault(require("path"));
var routes_1 = require("./routes");
var bodyParser = require("body-parser");
require("dotenv").config();
var app = express_1.default();
var PORT = parseInt(process.env.PORT, 10) || 9888;
connectDatabase_1.default();
app.use(express_1.default.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors_1.default());
app.use(morgan_1.default("dev"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// routes api
app.use("/api/book", routes_1.BookRouter);
app.use("/api/author", routes_1.AuthorRouter);
app.use("/api/list", routes_1.ListRouter);
app.use("/api/user", routes_1.UserRouter);
app.use("/api/auth", routes_1.AuthRouter);
app.use("/api/upload", routes_1.ImageRouter);
if (process.env.NODE_ENV === "production") {
    app.use(express_1.default.static(__dirname + "/../admin/build"));
    app.get("*", function (req, res) {
        res.sendFile(path_1.default.join(__dirname, "..", "admin", "build", "index.html"));
    });
}
app.listen(PORT, function () {
    console.log("Backend is running at port:", PORT);
});
