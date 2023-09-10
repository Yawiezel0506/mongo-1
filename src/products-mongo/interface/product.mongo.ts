import { ObjectId } from "mongodb";

interface ProductMongo {
  _id?: ObjectId;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
  quantity: number;
}

export default ProductMongo;
