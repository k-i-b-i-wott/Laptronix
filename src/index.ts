import express, { json } from 'express'





const initiallizeAPP =() => {
     const app = express()
   

    app.use(express.json())
    

    return app

}


const app = initiallizeAPP()


export default app