import IBook from "./book";

export default interface IOrder {
    order: Array<{book: IBook}>
    infoShipping: string
}
