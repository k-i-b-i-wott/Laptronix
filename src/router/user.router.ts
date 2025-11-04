
import * as userController from '../controller/user.controller'
import { adminAndUser,adminOnly,userOnly } from '../middlewares/bearerAuth';



export const userRoutes =(app:any)=>{
    app.get('/users',userController.getAllusers);
    app.get('/user/:emailAddress',userController.getUserByEmail);
    app.post('/user/register',userController.createUser);
    app.post('/user/login',userController.loginUser)
    app.get('/users/:id',userController.getUserById)
    app.delete('/user/:id',userController.deleteUser)
    app.post('/user/verify',userController.verifyEmail)


}

