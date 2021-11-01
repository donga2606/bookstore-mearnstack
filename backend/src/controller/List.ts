import express, { Request, Response } from "express";
import logQueryMongoose from "../utils/printQueryMongoose";
import { getAllRecords, setHeader } from "../utils/useInCallBack";
import { BookModel, AuthorModel, ListModel } from "../models";

interface ResponseType {
  success: boolean;
  data: any;
}

export default class ListCallback {
  static async get(
    req: Request,
    res: Response<ResponseType>
  ): Promise<Response<ResponseType>> {
    try {
      const payload = await getAllRecords(ListModel, "books");
      setHeader(res, payload, "list");
      return res.json({
        success: true,
        data: payload,
      });
    } catch (err) {
      return res.status(500);
    }
  }

  static async getById(
    req: Request,
    res: Response<ResponseType>
  ): Promise<Response<ResponseType>> {
    try {
      const _id = req.params.id;
      const payload = await ListModel.findById(_id)
        .populate("books")
        .lean({ virtuals: true });
      return res.json({
        success: true,
        data: payload,
      });
    } catch (err) {
      return res.status(500);
    }
  }
  static async post(
    req: Request,
    res: Response<ResponseType>
  ): Promise<Response<ResponseType>> {
    try {
      const data = req.file
        ? { ...req.body, image: req.file.filename, books: req.body.books_ids }
        : { ...req.body, books: req.body.books_ids };
      const payload = await ListModel.create(data);

      return res.json({
        success: true,
        data: payload,
      });
    } catch {
      return res.status(500);
    }
  }

  static async update(
    req: Request,
    res: Response<ResponseType>
  ): Promise<Response<ResponseType>> {
    try {
      const _id = req.params.id;

      const data = {
        ...req.body,
        image: req.file?.filename,
        books: req.body.books_ids,
      };

      !req.file && delete data.image;
      const payload = await ListModel.findOneAndUpdate(
        {
          _id,
        },
        data,
        { new: true },
        logQueryMongoose
      ).lean({virtuals: true});

      return res.json({
        success: true,
        data: payload,
      });
    } catch {
      return res.status(500);
    }
  }

  static async delete(
    req: Request,
    res: Response<ResponseType>
  ): Promise<Response<ResponseType>> {
    try {
      const _id = req.params.id;
      const payload = await ListModel.findByIdAndRemove(_id);

      return res.json({ success: true, data: payload });
    } catch (err) {
      return res.status(500);
    }
  }
}
