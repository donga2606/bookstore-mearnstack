import multer from "multer";
import path from "path";

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("multer", req.body);
    console.log("fieldName:", file.fieldname);

    cb(null, "./src/public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: diskStorage });

export default upload;
