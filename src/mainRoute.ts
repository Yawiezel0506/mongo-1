import express, {Router, Response, Request} from "express";
import productsRoute from "./products/products.route"
import productsMongoRoute from "./products-mongo/products.mongo.route"

const route: Router = express.Router()

route.get('/', (req: Request, res: Response) => {
    res.send('Hello To My Node-Ts Project!')
})

route.use("/products", productsRoute)
route.use("/mongoProducts", productsMongoRoute)

export default route