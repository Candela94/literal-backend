

import { Router } from "express";

import { v2 as cloudinary } from "cloudinary";

import { config } from "dotenv";

import fs from 'fs'
import { AdminMiddleware, authMiddleWare } from "../middlewares/auth.middleware.js";
import { Producto } from "../db/models/producto.model.js";
import { uploadFiles } from "../middlewares/uploads.js";
import { uploadProducto } from "../controllers/uploads.controllers.js";
import { getAllProductos, getProducto, deleteProducto } from "../controllers/productos.controllers.js";


config() //cargamos variables de entorno 




const router = Router()



//Carga de productos ADMIN

router.post('/admin/uploads', 
    AdminMiddleware, 
    uploadFiles.fields([
        { name: 'imgprod' },
        { name: 'audio' }
    ]), 
    uploadProducto
);





// ---------------------------------
//       CRUD de productos 
// ---------------------------------


//Obtener TODOS productos 
router.get("/products", getAllProductos)


//Obtener UN ÚNICO producto
router.get("/products/:pid", getProducto)


//Eliminar un producto
router.delete("/products/:pid",deleteProducto)






export default router