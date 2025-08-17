import mongoose from "mongoose";


const options = {
    collection: 'admin',
    strict: true,

    collation: {
        locale: 'es',
        strength: 1
    }
}



const adminSchema = new mongoose.Schema({



  

    email: {
        type: String,
        required: true,
        unique: true
    },


    password: {
        type: String,
        required: true,

    },


    usuario: {
        type: String,
        required: true,

    },






    createdAt: {
 
        type: Date,
        default: Date.now

    },

    role: {
        type: String,
        default: 'admin'
    }



}, options)






export const Admin = mongoose.model("admin", adminSchema)