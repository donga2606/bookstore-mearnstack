import IBook from "./book";

export interface ICart {
  orderBooks: Array<{ book: IBook; quantity: number }>;
  totalCash: number;
}
