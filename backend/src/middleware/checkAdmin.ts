import { NextFunction, Request, Response } from "express";

export default function checkAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = req.user;
  if (user.isAdmin) {
    return next();
  } else {
    return res.status(401).json({ error: "You must be an administrator!!!" });
  }
}
