import IAuthor from "./author";

interface IBook {
  _id: string;
  name: string;
  price: number;
  new_price?: number;
  author: IAuthor | string ;
  image: string;
  imageUrl: string;
  description: string;
  reviews: { content: string; reviewer: string }[];
}

export default IBook;
