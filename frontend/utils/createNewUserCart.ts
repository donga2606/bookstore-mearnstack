import IBook from "../controller/interfaces/book";
import { ICart } from "../controller/interfaces/cart";

export default function createNewUserCart({
  cart,
  book: newBook,
}: {
  cart: ICart;
  book?: IBook;
}) {
  const rawOrderBooks = newBook
    ? [...cart.orderBooks, { book: newBook, quantity: 1 }]
    : cart.orderBooks;

  const filteredOrderBooks = rawOrderBooks.filter(function (orderBook) {
    return orderBook.quantity > 0;
  });

  const onlyOrderBooksID = filteredOrderBooks.map(({ book, quantity }) => {
    return { book: book._id, quantity };
  });

  const totalCash = filteredOrderBooks
    .reduce(function (total, orderBook) {
      return total + orderBook.book.price * orderBook.quantity;
    }, 0)
    .toFixed(2);
  const newUserCart = {
    orderBooks: onlyOrderBooksID,
    totalCash: totalCash,
  };
  return newUserCart;
}
