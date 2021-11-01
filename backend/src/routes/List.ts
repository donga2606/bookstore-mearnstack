import express from "express";
import ListCallback from "../controller/List";
import verifyToken from "../middleware/verifyToken";
import checkAdmin from "../middleware/checkAdmin";

const router = express.Router();

router.get("/", ListCallback.get);
router.get("/:id", ListCallback.getById);
router.post("/", verifyToken, checkAdmin, ListCallback.post);
router.put("/:id", verifyToken, checkAdmin, ListCallback.update);
router.delete("/:id", ListCallback.delete);

export default router;
