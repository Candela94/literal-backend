


import { Producto } from "../db/models/producto.model.js";
import { BACKEND_URL } from "../config/config.js";

import fs from 'fs'
import cloudinary from '../config/cloudinary.config.js'




// ---------------------------------
//       Ruta UPLOADS ADMIN
// ---------------------------------



export const uploadProducto = async (req, res, next) => {


    try {


        if (!req.files || !req.files.imgprod || req.files.imgprod.length === 0) {


            return res.status(400).json({
                success: false,
                message: "Se requiere al menos una imagen"
            });
        }

        // Subir todas las imágenes a Cloudinary
        const imagePaths = req.files.imgprod.map(file => file.path);

        const uploadResults = await Promise.all(

            imagePaths.map(path =>

                cloudinary.uploader.upload(path, {

                    folder: 'imagenes_producto',
                    resource_type: 'image'

                })
            )
        );

        const imageUrls = uploadResults.map(result => result.secure_url);

        // Eliminar archivos locales
        imagePaths.forEach(path => fs.unlinkSync(path));




        // Crear producto en la base de datos
        const producto = await Producto.create({


            imagenes: imageUrls,
            portada: req.body.portada,
            nombre: req.body.nombre,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            talla: req.body.talla,
            dimensiones: req.body.dimensiones


        });





        return res.status(200).json({
            success: "ok",
            message: "Producto creado con éxito :)",
            data: producto,
            fileData: {
                imageUrls
            }
        });



    } catch (e) {



        console.error('Error en uploadProducto:', e);
        return res.status(500).json({
            error: 'Error interno del servidor al subir el producto'
        });


        
    }
};
