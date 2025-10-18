import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectdb from "./Config/Mongodb.js"
import connectcloudinary from "./Config/Cloudinary.js"
import userRouter from "./routes/UserRoutes.js"
import ProductRouter from "./routes/ProductRoutes.js"
import cartRouter from "./routes/CartRoutes.js"
import OrderRoutes from "./routes/OrderRoutes.js"

const app=express()
const port=process.env.PORT || 4000
connectdb()
connectcloudinary()

app.use(express.json())
app.use(cors())
app.use('/api/user',userRouter)
app.use('/api/product',ProductRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',OrderRoutes)
app.get('/',(req,res)=>{
    res.send("api working");
})

app.listen(port,()=>console.log('server started on port : '+port));