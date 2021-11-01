import { Response } from "express";

const getAllRecords = async (model: any, refArg: string) => {
  const payload = refArg
    ? await model.find().populate(refArg).lean({ virtuals: true })
    : await model.find().lean({ virtuals: true });
  return payload;
};

const setHeader = (res: Response, payload: any, apiName: string) => {
  res.setHeader("Content-Range", `${apiName} 0-10/${payload.length}`);
  res.setHeader("Access-Control-Expose-Headers", "Content-Range");
};

export { getAllRecords, setHeader };
