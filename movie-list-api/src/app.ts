import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import movieRoutes from './routes/movieRoutes';
import { MONGO_URI } from './config';


const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', movieRoutes);

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Conectado ao MongoDB');
        app.listen(5000, () => {
            console.log('Servidor rodando na porta 5000');
        });
    }).catch(error => console.log(error))