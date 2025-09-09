
import dotenv from 'dotenv'

dotenv.config()

export const BACKEND_URL = process.env.BACKEND_URL 
export const PORT = process.env.PORT || 3000

export const DB_USER =  process.env.DB_USER
export const DB_PASS =  process.env.DB_PASS 
export const CLUSTER =  process.env.CLUSTER 
export const DATABASE = process.env.DATABASE 


export const BACKEND_LOCAL= process.env.BACKEND_LOCAL

 export const JWT_SECRET = process.env.JWT_SECRET 


export const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME 

export const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY


export const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET 






 export const CLOUDINARY_URL = process.env.CLOUDINARY_URL 

 export const URL_LOCAL=process.env.URL_LOCAL 


 export const DB_MONGODB = process.env.DB_MONGODB 

 console.log("DB_MONGODB:", process.env.DB_MONGODB)
