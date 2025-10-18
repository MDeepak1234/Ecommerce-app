import express from 'express'

import { addProduct,listProduct,removeProduct,singleProduct } from '../controllers/productcontroller.js'
import upload from '../middleware/Multer.js';
import adminAuth from '../middleware/AdminAuth.js';

const ProductRouter=express.Router();

ProductRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addProduct);
ProductRouter.post('/remove',adminAuth,removeProduct);
ProductRouter.get('/list',listProduct);
ProductRouter.post('/single',singleProduct);

export default ProductRouter;

