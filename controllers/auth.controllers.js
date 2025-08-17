
import { Admin } from "../db/models/usuario.model.js";
import jwt from 'jsonwebtoken'

import { JWT_SECRET } from "../config/config.js";
import bcrypt from "bcryptjs";



//Registro de usuario 
export const registerUser = async (req, res, next) => {


    try {


        //1. Traer los datos del body
        const { email, password, usuario } = req.body



        //2.Verificar si el usuario existe
        const existingUser = await Admin.findOne({ email });

        if (existingUser) {
            return res.status(400).json({

                mensaje: "El usuario con este email ya existe, prueba a iniciar sesión"

            })
        }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        //3.Crear usuario 

        const user = new Admin({
            email,
            password: hashedPassword,
            
            usuario
        });
        await user.save()




        //4.Generar un nuevo token 

        const token = jwt.sign(
            {
                userId: user._id,
                name: user.name,

            },

            JWT_SECRET,

            {
                expiresIn: '2h'
            }


        )



        //5.Devolver los datos del usuario + el JWT Token

        res.status(201).json({
            mensaje: "Usuario registrado correctamente :)",
            token,
            user: {
                id: user._id,
                nombre: user.nombre,
                email: user.email,
                usuario: user.usuario
            }
        })



    } catch (e) {
        next(e)
    }




}









//Login

export const loginUser = async (req, res, next) => {

    try {

        //1. Traemos datos del body
        const { usuario, password } = req.body



        //2.Verificamos si el usuario existe 
        const user = await Admin.findOne({ usuario })

        if (!user) {
            return res.status(401).json({
                mensaje: "Usuario o contraseña incorrectos"
            })
        }


        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ mensaje: "Clave incorrecta" })
        }


        //3. Generamos nuevo token 

        const token = jwt.sign(
            {
                userId: user._id,
                nombre: user.nombre,
                role: user.role


            },

            JWT_SECRET,


            {
                expiresIn: '2h'
            }
        )


        //4. Devolvemos datos 

        res.status(201).json({

            mensaje: "Accediste correctamente :)",
            token,
            user: {

                id: user._id,
                nombre: user.nombre,
                email: user.email,
                usuario:user.usuario,
                role:user.role

               
            }

        })



    } catch (e) {

        next(e)


    }

}
