import { Dispatch } from "react";
import { ICart } from "./cart";
import IOrder from "./order";
import IUser from "./user";

export default interface IDataContext {
  state: IState;
  dispatch: Dispatch<any>;
}

export interface IAuth {
  user: IUser;
  token: string;
}

export interface INotify {
  type: "error" | "success";
  message: string;
}

export interface IState {
  auth: IAuth;
  notify: INotify;
  orders: Array<IOrder>;
  cart: ICart;
}
