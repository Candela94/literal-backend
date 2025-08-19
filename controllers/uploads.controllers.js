


import { Producto } from "../db/models/producto.model.js";
import { BACKEND_URL } from "../config/config.js";

import fs from 'fs'
import cloudinary from '../config/cloudinary.config.js'




// ---------------------------------
//       Ruta UPLOADS ADMIN
// ---------------------------------


export const uploadProducto = async (req, res, next) => {

    try {

        console.log('=== DEBUG uploadProducto ===');
        console.log('Files recibidos:', req.files);
        console.log('Body recibido:', req.body);
        console.log('=============================');
        

        // Verificar que al menos haya portada O imágenes adicionales
        if (!req.files || (!req.files.portada && (!req.files.imgprod || req.files.imgprod.length === 0))) {
            return res.status(400).json({
                success: false,
                message: "Se requiere al menos una imagen (portada o imágenes adicionales)"
            });
        }

        let imageUrls = [];
        let portadaUrl = null;

        // Procesar portada si existe
        if (req.files.portada && req.files.portada.length > 0) {
            const portadaFile = req.files.portada[0];
            
            const portadaUpload = await cloudinary.uploader.upload(portadaFile.path, {
                folder: 'imagenes_producto',
                resource_type: 'image'
            });
            
            portadaUrl = portadaUpload.secure_url;
            
            // Eliminar archivo local de portada
            fs.unlinkSync(portadaFile.path);
        }

        // Procesar imágenes adicionales si existen
        if (req.files.imgprod && req.files.imgprod.length > 0) {
            const imagePaths = req.files.imgprod.map(file => file.path);

            const uploadResults = await Promise.all(
                imagePaths.map(path =>
                    cloudinary.uploader.upload(path, {
                        folder: 'imagenes_producto',
                        resource_type: 'image'
                    })
                )
            );

            imageUrls = uploadResults.map(result => result.secure_url);

            // Eliminar archivos locales de imágenes adicionales
            imagePaths.forEach(path => fs.unlinkSync(path));
        }

        // Si no hay portada específica, usar la primera imagen adicional como portada
        if (!portadaUrl && imageUrls.length > 0) {
            portadaUrl = imageUrls[0];
        }

        // Crear producto en la base de datos
        const producto = await Producto.create({
            imagenes: imageUrls,
            portada: portadaUrl, // Ahora guardamos la URL de Cloudinary, no req.body.portada
            nombre: req.body.nombre,
            precio: req.body.precio,
            descripcion: req.body.descripcion,
            talla: req.body.talla || '',
            dimensiones: req.body.dimensiones || ''
        });

        return res.status(200).json({
            success: true, // Cambié "ok" por true para consistencia
            message: "Producto creado con éxito :)",
            data: producto,
            fileData: {
                portadaUrl,
                imageUrls,
                totalImages: imageUrls.length
            }
        });

    } catch (error) {
        console.error('Error en uploadProducto:', error);
        
        // Limpiar archivos en caso de error
        if (req.files) {
            if (req.files.portada) {
                req.files.portada.forEach(file => {
                    if (fs.existsSync(file.path)) {
                        fs.unlinkSync(file.path);
                    }
                });
            }
            if (req.files.imgprod) {
                req.files.imgprod.forEach(file => {
                    if (fs.existsSync(file.path)) {
                        fs.unlinkSync(file.path);
                    }
                });
            }
        }

        return res.status(500).json({
            success: false,
            message: 'Error interno del servidor al subir el producto',
            error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno'
        });
    }
};