import express, { Router } from "express";
import productsMongoController from "./products.mongo.controller";

const route:Router = express.Router()

route.get('/', productsMongoController.getAllProducts)
route.get('/:id', productsMongoController.getProduct)
route.delete('/:id', productsMongoController.deleteProduct)
route.patch('/:id', productsMongoController.updateProduct)
route.put('/:id', productsMongoController.updateTotalProduct)
route.post("/", productsMongoController.createProduct)

export default route