import 'dotenv/config.js';
import cors from 'cors';
import express from 'express';
import NovasRotas from './routes.js';
import './utils/global.js'; //Import apenas para a var global funcionar em todas pastas

const api = express()

api.use(cors());
api.use(express.json());
api.use('/uploads', express.static('src/uploads'));
NovasRotas(api);


const PORTA = process.env.PORT;
api.listen(PORTA, () => console.log("A API subiu com sucesso na porta: " + PORTA));