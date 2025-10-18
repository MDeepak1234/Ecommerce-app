import express from 'express'
import { allorders, Cod, placerazorpay, PlaceStripe, updatestatus, userorders, verifystripe } from '../controllers/OrderController.js';
import adminAuth from '../middleware/AdminAuth.js';
import authUser from '../middleware/auth.js';

const OrderRoutes=express.Router();

OrderRoutes.post('/cod',authUser,Cod)
OrderRoutes.post('/stripe',authUser,PlaceStripe)
OrderRoutes.post('/razorpay',authUser,placerazorpay)
OrderRoutes.post('/list',adminAuth,allorders)
OrderRoutes.post('/status',adminAuth,updatestatus)
OrderRoutes.post('/userorders',authUser,userorders)

OrderRoutes.post('/verifystripe',authUser,verifystripe)

export default OrderRoutes;
