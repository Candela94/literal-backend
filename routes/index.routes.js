

import { Router } from "express";

import { v2 as cloudinary } from "cloudinary";

import { config } from "dotenv";

import fs from 'fs'


config() //cargamos variables de entorno 


//configuración de cloudinary 

cloudinary.config({

    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET


})


const router = Router()



export default router