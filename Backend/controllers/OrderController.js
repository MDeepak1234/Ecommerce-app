import OrderModel from "../models/OrderModel.js";
import userModel from "../models/UserModel.js";
import Stripe from "stripe"
const currency='usd'
const deliverycharges=10
const stripe=new Stripe(process.env.STRIPE)


const Cod=async(req,res)=>{
    try {
        const {userid,amount,items,address}=req.body;
        const orderdata={
            userid,
            items,
            amount,
            address,
            paymentmethod:"cod",
            payment:false,
            date:Date.now()
        }

        const neworder=new OrderModel(orderdata)
        await neworder.save()
        await userModel.findByIdAndUpdate(userid,{cartData:{}})
        res.json({success:true,message:"Order Placed"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

const PlaceStripe=async(req,res)=>{
    try {
        const {userid,items,amount,address}=req.body
        const {origin}=req.headers
        const orderdata={
            userid,
            items,
            amount,
            address,
            paymentmethod:"Stripe",
            payment:false,
            date:Date.now()
        }
        const neworder=new OrderModel(orderdata)
        await neworder.save()
        const line_items=items.map((item)=>({
            price_data:{
                currency:currency,
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100
            },
            quantity:item.quantity
        }))
        line_items.push({
            price_data:{
                currency:currency,
                product_data:{
                    name:'Delivery Charges'
                },
                unit_amount:deliverycharges*100
            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            success_url:`${origin}/verify?success=true&orderid=${neworder._id}`,
            cancel_url:`${origin}/verify?success=false&orderid=${neworder._id}`,
            line_items,
            mode:'payment',
        })
        res.json({success:true,session_url:session.url})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

const verifystripe=async(req,res)=>{
    const {orderid,success,userid}=req.body
    try {
        if(success==="true"){
            await OrderModel.findByIdAndUpdate(orderid,{payment:true})
            await userModel.findByIdAndUpdate(userid,{cartData:{}})
            res.json({success:true})
        }else{
            await OrderModel.findByIdAndDelete(orderid)
            res.json({success:false})
        }
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

const placerazorpay=async(req,res)=>{
    
}

const allorders=async(req,res)=>{
    try {
        const order=await OrderModel.find({});
        res.json({success:true,order})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

const userorders=async(req,res)=>{
    try {
        const {userid}=req.body;

        const orders=await OrderModel.find({userid})
        res.json({success:true,orders})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

const updatestatus=async(req,res)=>{
    try {
        const {orderid,status}=req.body;
        await OrderModel.findByIdAndUpdate(orderid,{status})
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}

export {userorders,allorders,PlaceStripe,placerazorpay,Cod,updatestatus,verifystripe};