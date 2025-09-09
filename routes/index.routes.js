

import { Router } from "express";


import { config } from "dotenv";

import { AdminMiddleware, authMiddleWare } from "../middlewares/auth.middleware.js";
import { uploadFiles } from "../middlewares/uploads.js";
import { uploadProducto } from "../controllers/uploads.controllers.js";
import { getAllProductos, getProducto, deleteProducto } from "../controllers/productos.controllers.js";
import { loginUser, registerUser } from "../controllers/auth.controllers.js";
import { createOrder } from "../controllers/order.controllers.js";

// import { createPaymentIntent } from "../controllers/payment.controllers.js";

config() //cargamos variables de entorno 




const router = Router()



//Carga de productos ADMIN

router.post('/admin/uploads', 
    AdminMiddleware, 
    uploadFiles.fields([
        { name: 'portada', maxCount: 1 },
        { name: 'imgprod', maxCount: 10 }
    ]), 
    uploadProducto
);



// ---------------------------------
//       REGISTRO/LOGIN 
// ---------------------------------


router.post("/admin/register", registerUser)


router.post("/admin/login", loginUser)







// ---------------------------------
//       CRUD de productos 
// ---------------------------------


//Obtener TODOS productos 
router.get("/products", getAllProductos)


//Obtener UN ÚNICO producto
router.get("/products/:pid", getProducto)


//Eliminar un producto
router.delete("/products/:pid",deleteProducto)




// ---------------------------------
//       PASARELA DE PAGO 
// ---------------------------------


//Dirección de envío

router.post('/order', createOrder)


//Pago 

// router.post('/create-payment', createPaymentIntent)








export default router