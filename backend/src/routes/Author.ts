import express from "express";
import AuthorCallback from "../controller/Author";

const routes = express.Router();


routes.get("/", AuthorCallback.get);
routes.post("/", AuthorCallback.post);
routes.get("/:id", AuthorCallback.getById);
routes.put("/:id", AuthorCallback.update);
routes.delete("/:id", AuthorCallback.delete);


export default routes