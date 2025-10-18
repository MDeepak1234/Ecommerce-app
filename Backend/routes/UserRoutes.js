import express from 'express';
import { LoginUser,registerUser,adminLogin } from '../controllers/userController.js';

const userRouter=express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',LoginUser)
userRouter.post('/admin',adminLogin)

export default userRouter;
