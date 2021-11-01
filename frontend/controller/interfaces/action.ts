import ACTIONS from "../store/actions"
import { ICart } from "./cart"
import { IAuth, INotify } from "./dataContext"
import IOrder from "./order"

type  IAction = 
    | {type: ACTIONS.AUTH, payload: IAuth}
    | {type: ACTIONS.NOTIFY, payload: INotify}
    | {type: ACTIONS.ADD_ORDER, payload: IOrder}
    | {type: ACTIONS.CART, payload: ICart}

export default IAction