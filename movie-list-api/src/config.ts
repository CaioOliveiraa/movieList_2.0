import dotenv from 'dotenv'
import { deflate } from 'zlib';

dotenv.config()

export const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://caio0liveir:<db_password>@mycluster.pr9bcr1.mongodb.net/?retryWrites=true&w=majority&appName=MyCluster"
export const JWT_SECRET = process.env.JWT || "blabla"