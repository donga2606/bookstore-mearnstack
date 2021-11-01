import { NextFunction, Request, Response } from "express";
require("dotenv").config;
import jwt from "jsonwebtoken";
import { UserModel } from "../models";
const secretKey = <string>process.env.TOKEN_SECRET_KEY;

export default async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = <string>req.headers["x-access-token"];
  if (!token)
    return res
      .status(403)
      .json({ error: "A token is required for authentication" });
  try {
    console.log("test");
    const decoded: any = jwt.verify(token, secretKey);
    const payload = await UserModel.findById(decoded.user_id);
    if (payload) {
      req.user = payload;
    } else {
      return res.status(404).json({ error: "Can not find User" });
    }
  } catch (err) {
    return res.status(401).json({ error: "Please login again!" });
  }
  return next();
}
