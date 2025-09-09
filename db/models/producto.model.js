
import mongoose from "mongoose";


const options = {
    collection: 'producto',
    strict: true,

    collation: {
        locale:"es",
        strength: 1,
    }
}




const productoSchema = new mongoose.Schema({


    imagenes:[String], 

    portada: String,

    nombre: String,

    precio: {type:Number, required:true}, 

    descripcion: String, 
    
    talla: [String],

    dimensiones: String,

    hover:String,


    createdAt: {

        type: Date, 
        default: Date.now

    },





},options)



export const Producto = mongoose.model('producto', productoSchema)