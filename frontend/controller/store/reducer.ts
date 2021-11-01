import action from "../interfaces/action";
import IAction from "../interfaces/action";
import { IState } from "../interfaces/dataContext";
import ACTIONS from "./actions";

const reducer = (state: IState, action: IAction) => {
  switch (action.type) {
    case ACTIONS.AUTH:
      return { ...state, auth: action.payload };

    case ACTIONS.NOTIFY:
      return { ...state, notify: action.payload };

    case ACTIONS.ADD_ORDER:
      return { ...state, orders: [...state.orders, action.payload] };
      
    case ACTIONS.CART:
      return { ...state, cart: action.payload };

    default:
      return state;
  }
};

export default reducer;
