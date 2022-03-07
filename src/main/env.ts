import * as dotenv from 'dotenv';
dotenv.config();
const DB_USER = process.env.DB_USER
let DB_PASSWORD = ''
if(!(process.env.DB_PASSWORD === undefined))
    DB_PASSWORD = encodeURIComponent(process.env.DB_PASSWORD)

export const url_mongo = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.khshl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
export const secret = (process.env.SECRET === undefined) ? '' :  process.env.SECRET
export const expiresIn = (process.env.EXPIRES_TOKEN === undefined)? 300 : process.env.EXPIRES_TOKEN