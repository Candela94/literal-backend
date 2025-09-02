import { Order } from "../db/models/order.model.js";




// Controlador para la pasarela de pago


export const createOrder = async (req, res) => {


  try {
    const { email, datosEnvio, cartItems, totalPrice, paymentMethod } = req.body;

    // Validación de campos mínimos obligatorios
    if (!email || !datosEnvio || !cartItems?.length || !totalPrice || !paymentMethod) {
      return res.status(400).json({ message: "Faltan campos obligatorios en el pedido" });
    }

    const newOrder = new Order({

      email,
      datosEnvio,
      cartItems,
      totalPrice,
      paymentMethod

    });

    await newOrder.save();




    // Enviar orden completa como respuesta

    res.status(201).json({

      message: 'Pedido realizado correctamente',
      order: newOrder

    });


    

  } catch (e) {
    console.error('Error al crear el pedido', e);
    res.status(500).json({ message: 'Error al crear el pedido' });
  }
};
