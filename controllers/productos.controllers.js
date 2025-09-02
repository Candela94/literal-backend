

import { Producto } from "../db/models/producto.model.js";
const responseAPI = {
    msg: "",
    data: [],
    status: "ok"

}


//Obtener todos los productos
export const getAllProductos = async (req, res, next) => {


    try {

        const productos = await Producto.find();
        responseAPI.data = productos;
        responseAPI.msg = "Productos encontradas con éxito"
        responseAPI.status = 'ok';

        res.status(200).json(responseAPI)

    } catch (e) {
        console.error("Tuvimos un error ", e)
        next(e)
    }



}









//Obtener un único producto 
export const getProducto = async (req, res, next) => {

    const { pid } = req.params



    try {

        const producto = await Producto.findById(pid);
        responseAPI.data = producto;
        responseAPI.msg = `Producto con id ${pid} encontrado con éxito`
        responseAPI.status = 'ok';

        res.status(200).json(responseAPI)

    } catch (e) {
        console.error("tuvimos un error ", e)
        next(e)
    }


}





//Eliminar un producto 
export const deleteProducto = async (req, res, next) => {


    const { pid } = req.params

    try {

        const eliminado = await Producto.findByIdAndDelete(pid);
        responseAPI.data = eliminado;
        responseAPI.msg = `Producto con id ${pid} eliminado con éxito`
        responseAPI.status = 'ok';

        res.status(200).json(responseAPI)

    } catch (e) {
        console.error("Error ", e)
        next(e)
    }

}




