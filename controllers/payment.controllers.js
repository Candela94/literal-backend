


// import stripe from "../config/stripe.js";



// export const createPaymentIntent = async (req,res) => {


//     try{

//         const {amount} = req.body;

//         const paymentIntent = await stripe.paymentIntents.create({

//             amount, //en cents: 5000 = 50e, lo recibo desde el front
//             currency:'eur',   
//             payment_method_types:['card'],
//         })

//         res.status(200).json({

//             clientSecret:paymentIntent.client_secret,  //client_secret es lo que usará React para finalizar el pago con tarjeta, el endpoint responde con este clientSecret
//         })



//     }catch (error) {
//         console.error('❌ Error al crear el PaymentIntent:', error); // ✅
//         res.status(500).json({ error: error.message });
//       }
// }