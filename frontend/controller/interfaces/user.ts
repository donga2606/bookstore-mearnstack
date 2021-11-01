import IBook from "./book";
import { ICart } from "./cart";

export default interface IUser {
  _id: string;
  email: string;
  password: string;
  name: string;
  cart: ICart;
}
