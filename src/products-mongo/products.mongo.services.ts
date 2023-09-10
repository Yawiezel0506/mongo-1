import ProductMongo from "./interface/product.mongo";

import joi, { ObjectSchema } from "joi";
import productsMongoDal from "./products.mongo.dal";

const updateProductSchema: ObjectSchema = joi.object({
  title: joi.string(),
  price: joi.number().positive(),
  description: joi.string(),
  category: joi.string(),
  image: joi.string().uri(),
  rating: joi.object({
    rate: joi.number().positive().max(5),
    count: joi.number().integer().min(0),
  }),
  quantity: joi.number().integer().min(0),
});

const newProductSchema = joi.object({
  title: joi.string().required(),
  price: joi.number().positive().required(),
  description: joi.string().required(),
  category: joi.string().required(),
  image: joi.string().uri().required(),
  rating: joi
    .object({
      rate: joi.number().positive().max(5).required(),
      count: joi.number().integer().min(0).required(),
    })
    .required(),
  quantity: joi.number().integer().min(0).required(),
});

const getAllProducts = async (): Promise<ProductMongo[] | null> => {
  try {
    const products: ProductMongo[] | null = await productsMongoDal.getAllProducts();
    return products;
  } catch (error) {
    const catchError = error as unknown as Error;
    throw new Error("error:" + catchError);
  }
};

const getProduct = async (productId: string): Promise<ProductMongo | null> => {
  try {
    const product: ProductMongo | null = await productsMongoDal.getProductById(productId);
    return product;
  } catch (error) {
    const catchError = error as unknown as Error;
    throw new Error("error:" + catchError);
  }
};

const deleteProduct = async (productId: string): Promise<ProductMongo | null> => {
  try {
    const product: ProductMongo | null = await productsMongoDal.deleteProductById(productId);
    return product;
  } catch (error) {
    const catchError = error as unknown as Error;
    throw new Error("cannot read the json:" + catchError.message);
  }
};

const updateProduct = async (
  productId: string,
  newProduct: Partial<ProductMongo>
): Promise<ProductMongo | null> => {
  try {
    const { error } = updateProductSchema.validate(newProduct);
    if (error) throw new Error(`Validation error: ${error.details[0].message}`);
    const product: ProductMongo = await productsMongoDal.updateProductById(
      productId,
      newProduct
    );
    return product;
  } catch (error) {
    const catchError = error as unknown as Error;
    throw new Error("cannot read the json:" + catchError.message);
  }
};

const updateTotalProduct = async (
  productId: string,
  newProduct: ProductMongo
): Promise<ProductMongo | null> => {
  try {
    const { error } = updateProductSchema.validate(newProduct);
    if (error) throw new Error(`Validation error: ${error.details[0].message}`);
    const product: ProductMongo = await productsMongoDal.updateProductById(
      productId,
      newProduct
    );
    return product;
  } catch (error) {
    const catchError = error as unknown as Error;
    throw new Error("cannot read the json:" + catchError.message);
  }
};

const createProduct = async (
  newProduct: ProductMongo
): Promise<ProductMongo | null> => {
  try {
    const { error } = newProductSchema.validate(newProduct);
    if (error) {
      throw new Error(`Validation error: ${error.details[0].message}`);
    }

    return productsMongoDal.createProduct(newProduct);
  } catch (error) {
    const catchError = error as unknown as Error;
    throw new Error("cannot read the json:" + catchError.message);
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
