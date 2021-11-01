"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var List_1 = __importDefault(require("../controller/List"));
var verifyToken_1 = __importDefault(require("../middleware/verifyToken"));
var checkAdmin_1 = __importDefault(require("../middleware/checkAdmin"));
var router = express_1.default.Router();
router.get("/", List_1.default.get);
router.get("/:id", List_1.default.getById);
router.post("/", verifyToken_1.default, checkAdmin_1.default, List_1.default.post);
router.put("/:id", verifyToken_1.default, checkAdmin_1.default, List_1.default.update);
router.delete("/:id", List_1.default.delete);
exports.default = router;
