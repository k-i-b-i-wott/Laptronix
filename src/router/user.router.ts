
import * as userController from '../controller/user.controller'
import { adminAndUser,adminOnly,userOnly } from '../middlewares/bearerAuth';



export const userRoutes =(app:any)=>{
    app.get('/users',userController.getAllusers);
    app.get('/user/:emailAddress',adminOnly,userController.getUserByEmail);
    app.post('/user/register',userController.createUser);
    app.post('/user/login',userController.loginUser)
    app.get('/users/:id',adminAndUser,userController.getUserById)
    app.delete('/user/:id',adminOnly,userController.deleteUser)
    app.post('/user/verify',userController.verifyEmail)
    app.patch('/user/:id',adminAndUser,userController.updateUser)
}

