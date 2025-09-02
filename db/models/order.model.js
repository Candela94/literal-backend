import mongoose from "mongoose";
import { Producto } from "./producto.model.js";

const options = {
    collection: 'order',
    strict: true,

    collation: {
        locale:"es",
        strength: 1,
    }
}




const orderSchema = new mongoose.Schema({


    email:{type:String, required:true},

    datosEnvio:{
        nombre:String,
        direccion:String,
        ciudad:String,
        cp:String,
        pais:String,
    },


    cartItems: [
        {
            productId: {type: mongoose.Schema.Types.ObjectId, ref:'producto'},

            quantity: Number,
        }
    ],

    paymentMethod: {
        type: String,
        enum: ["tarjeta", "paypal"],
        required: true
      },
    




    totalPrice:Number,


    createdAt: {type: Date, default: Date.now}



    

})


export const Order = mongoose.model('order', orderSchema)
