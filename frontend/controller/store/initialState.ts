import IBook from "../interfaces/book";
import { ICart } from "../interfaces/cart";
import {INotify } from "../interfaces/dataContext";
import IOrder from "../interfaces/order";
import IUser from "../interfaces/user";

export default {
  auth: <{ user: IUser; token: string }>{},
  notify: <INotify>{},
  orders: <Array<IOrder>>[],
  cart: <ICart>{ orderBooks: [], totalCash: 0},
};
