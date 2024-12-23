import {config} from 'dotenv';
config()

export const PORT=process.env.PORT || 3000
export const DB_USER=process.env.DB_USER || 'root'
export const DB_PASSWORD=process.env.DB_PASSWORD || ''
export const DB_HOST=process.env.DB_HOST || 'localhost'
export const DB_DATABASE=process.env.DB_DATABASE || 'tesoreriadb'
export const DB_PORT=process.env.DB_PORT || 3306
export const PAYPAL_CLIENT=process.env.PAYPAL_CLIENT
export const PAYPAL_SECRET=process.env.PAYPAL_SECRET
export const PAYPAL_API_KEY= 'https://api-m.sandbox.paypal.com'
