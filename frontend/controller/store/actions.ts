import createNewUserCart from "../../utils/createNewUserCart";
import api from "../api/baseApi";
import IBook from "../interfaces/book";
import { ICart } from "../interfaces/cart";
import { IAuth, INotify } from "../interfaces/dataContext";
import IUser from "../interfaces/user";

enum ACTIONS {
  AUTH = "AUTH",
  NOTIFY = "NOTIFY",
  CART = "CART",
  ADD_ORDER = "ADD_ORDER",
}

function addToCart({
  book,
  dispatch,
  cart,
  auth,
}: {
  book: IBook;
  dispatch: any;
  cart: ICart;
  auth: IAuth;
}) {
  const isBookInCart =
    cart.orderBooks &&
    !cart.orderBooks.every((item) => item.book._id !== book._id);
  if (isBookInCart) {
    return dispatch({
      type: ACTIONS.NOTIFY,
      payload: { type: "error", message: "Your book already in cart" },
    });
  }
  const newUserCart = createNewUserCart({ cart, book });
  updateUser(auth, { cart: newUserCart })
    .then((response) => {
      dispatch({
        type: ACTIONS.AUTH,
        payload: { user: response.data.data, token: auth.token },
      });
      dispatch({
        type: ACTIONS.NOTIFY,
        payload: { type: "success", message: "Add to cart successfully" },
      });
    })
    .catch((error) => {
      addNotify({ type: "error", message: error }, dispatch);
    });
}

function deleteItemInCart() {}

function updateUser(auth: IAuth, payload: any) {
  return api.put(`user/${auth.user._id}`, payload, {
    headers: { "x-access-token": auth.token },
  });
}

function updateCart({
  auth,
  cart,
  dispatch,
}: {
  auth: IAuth;
  dispatch: any;
  cart: ICart;
}) {
  const newUserCart = createNewUserCart({ cart });
  updateUser(auth, { cart: newUserCart })
    .then((response) => {
      dispatch({
        type: ACTIONS.AUTH,
        payload: { user: response.data.data, token: auth.token },
      });
      dispatch({
        type: ACTIONS.NOTIFY,
        payload: { type: "success", message: "successful update cart" },
      });
    })
    .catch((error) => {
      addNotify({ type: "error", message: error }, dispatch);
    });
}

function addUser(response: any, dispatch: any) {
  localStorage.setItem("token", response.data.token);
  dispatch({
    type: ACTIONS.AUTH,
    payload: { token: response.data.token, user: response.data.data },
  });
  addNotify({ type: "success", message: "Successful Login" }, dispatch);
}

function addNotify(message: INotify, dispatch: any) {
  dispatch({ type: ACTIONS.NOTIFY, payload: message });
}

function logOut(dispatch: any) {
  dispatch({ type: ACTIONS.AUTH, payload: {} });
  localStorage.removeItem("token");
  dispatch({
    type: ACTIONS.NOTIFY,
    payload: { type: "success", message: "Successfull logout" },
  });
}

export { addUser, addNotify, addToCart, updateCart, logOut };
export default ACTIONS;
