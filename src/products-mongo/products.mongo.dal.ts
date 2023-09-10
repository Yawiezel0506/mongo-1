import { ObjectId } from "mongodb";
import { client } from "../utils/init.mongo";
import ProductMongo from "./interface/product.mongo";

async function getAllProducts(): Promise<ProductMongo[]> {
  const db = client.db("shop");
  const products = db.collection<ProductMongo>("products");

  try {
    const allProducts = await products.find({}).toArray();
    return allProducts;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

async function getProductById(productId: string): Promise<ProductMongo | null> {
  const db = client.db("shop");
  const products = db.collection<ProductMongo>("products");

  try {
    const product = await products.findOne({ _id: new ObjectId(productId) });
    return product;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
}

async function createProduct(productData: ProductMongo): Promise<ProductMongo> {
  const db = client.db("shop");
  const products = db.collection<ProductMongo>("products");

  try {
    const result = await products.insertOne(productData);

    if (result.insertedId) {
      const insertedProductId = result.insertedId;
      const newProduct = await products.findOne({ _id: insertedProductId });
      return newProduct;
    } else {
      throw new Error("Failed to create the product.");
    }
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

async function updateProductById(
  productId: string,
  updatedProductData: Partial<ProductMongo>
): Promise<ProductMongo | null> {
  const db = client.db("shop");
  const products = db.collection<ProductMongo>("products");

  try {
    const result = await products.updateOne(
      { _id: new ObjectId(productId) },
      { $set: updatedProductData }
    );

    if (result.matchedCount === 1) {
      const updatedProduct = await products.findOne({
        _id: new ObjectId(productId),
      });
      return updatedProduct;
    } else {
      throw new Error("Product not found or not updated.");
    }
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

async function deleteProductById(
  productId: string
): Promise<ProductMongo | null> {
  const db = client.db("shop");
  const products = db.collection<ProductMongo>("products");

  try {
    const productToDelete = await products.findOne({
      _id: new ObjectId(productId),
    });

    if (!productToDelete) {
      return null;
    }

    await products.deleteOne({ _id: new ObjectId(productId) });

    return productToDelete;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProductById,
  deleteProductById,
};
