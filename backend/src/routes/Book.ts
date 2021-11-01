import express from "express";
import upload from "../middleware/upload";
import BookCallback from "../controller/Book";
import verifyToken from "../middleware/verifyToken";
import checkAdmin from "../middleware/checkAdmin";

const router = express.Router();

router.get("/", BookCallback.get);
router.get("/:id", BookCallback.getById);
router.post("/", verifyToken, checkAdmin, BookCallback.post);
router.put("/:id", verifyToken, checkAdmin, BookCallback.update);
router.delete("/:id", verifyToken, checkAdmin, BookCallback.delete);

export default router;
