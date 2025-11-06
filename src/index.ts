import express, { json } from 'express'
 import { userRoutes } from './router/user.router'
import { productsRoutes } from './router/products.routers'




const initiallizeAPP =() => {
     const app = express()  

    app.use(express.json())

    userRoutes(app);
    productsRoutes(app);   

    return app

}


const app = initiallizeAPP()


export default app