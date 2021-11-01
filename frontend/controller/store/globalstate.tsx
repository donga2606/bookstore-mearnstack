import React, { FC, useEffect, useReducer } from "react";
import api from "../api/baseApi";
import Action from "../interfaces/action";
import { ICart } from "../interfaces/cart";
import IDataContext from "../interfaces/dataContext";
import ACTIONS, { addNotify, addUser } from "./actions";
import initialState from "./initialState";
import reducer from "./reducer";

const DataContext = React.createContext<IDataContext>({
  state: initialState,
  dispatch: ({ type, payload }: Action) => null,
});

const DataProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { auth, notify } = state;
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api
        .get("auth/access-token", { headers: { "x-access-token": token } })
        .then((response) => addUser(response, dispatch))
        .catch((error) => {
          addNotify({ type: "error", message: error }, dispatch);
          localStorage.removeItem("token");
        });
    }
  }, []);

  useEffect(() => {
    if (Object.keys(auth).length !== 0) {
      dispatch({ type: ACTIONS.CART, payload: auth.user.cart });
    } else {
      dispatch({
        type: ACTIONS.CART,
        payload: { orderBooks: [], totalCash: 0 } as ICart,
      });
    }
  }, [auth]);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export { DataProvider, DataContext };
