import dotenv from 'dotenv'

dotenv.config()

export const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://caio0liveir:Caco260100@mycluster.pr9bcr1.mongodb.net/movieList?retryWrites=true&w=majority&appName=MyCluster"

export const JWT_SECRET = 'seuSegredoJWT'; 
export const JWT_EXPIRATION = '15m'; 
export const REFRESH_TOKEN_EXPIRATION = '7d'; 