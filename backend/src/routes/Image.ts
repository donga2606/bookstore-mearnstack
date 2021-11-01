import express from "express";
// import upload from "../middleware/multer";
const router = express.Router();

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

export default router;
