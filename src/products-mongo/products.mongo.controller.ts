import { Request, Response } from "express";
import productsMongoServices from "./products.mongo.services";
import ProductMongo from "./interface/product.mongo";


const getAllProducts = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  try {
    const products = await productsMongoServices.getAllProducts();
    if (products) return res.status(202).json(products);
    res.status(404).send("NOT FOUND!");
  } catch (error) {
    const catchError = error as unknown as Error;
    res.status(505).json("error: " + catchError);
  }
};

const getProduct = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const id: string = req.params.id;
  try {
    const products = await productsMongoServices.getProduct(id);
    if (products) return res.status(202).json(products);
    res.status(404).send("NOT FOUND!");
  } catch (error) {
    const catchError = error as unknown as Error;
    res.status(505).json("error: " + catchError);
  }
};
const deleteProduct = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const id: string = req.params.id;
  try {
    const products = await productsMongoServices.deleteProduct(id);
    if (products) return res.status(202).json(products);
    res.status(404).send("NOT FOUND!");
  } catch (error) {
    const catchError = error as unknown as Error;
    res.status(505).json("error: " + catchError);
  }
};

const updateProduct = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const id: string = req.params.id;
  const newProduct: Partial<ProductMongo> = req.body;
  try {
    const product: ProductMongo = await productsMongoServices.updateProduct(
      id,
      newProduct
    );
    if (product) return res.status(202).json(product);
    res.status(404).send("NOT FOUND!");
  } catch (error) {
    const catchError = error as unknown as Error;
    res.status(505).json("error: " + catchError);
  }
};

const updateTotalProduct = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const id: string = req.params.id;
  const newProduct: ProductMongo = req.body;
  try {
    const product: ProductMongo = await productsMongoServices.updateProduct(
      id,
      newProduct
    );
    if (product) return res.status(202).json(product);
    res.status(404).send("NOT FOUND!");
  } catch (error) {
    const catchError = error as unknown as Error;
    res.status(505).json("error: " + catchError);
  }
};

const createProduct = async (
  req: Request,
  res: Response
): Promise<Response | void> => {
  const newProduct: ProductMongo = req.body;
  try {
    const product: ProductMongo = await productsMongoServices.createProduct(newProduct);
    if (product) return res.status(202).json(product);
    res.status(404).send("NOT FOUND!");
  } catch (error) {
    const catchError = error as unknown as Error;
    res.status(505).json("error: " + catchError);
  }
};

export default {
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  updateTotalProduct,
  createProduct
};
