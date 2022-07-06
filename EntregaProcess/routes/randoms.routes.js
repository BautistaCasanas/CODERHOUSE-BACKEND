import express from 'express';
import Random from '../controllers/Randoms.js';


const randomsRouter = express.Router();
const random = new Random();

randomsRouter.get('/', random.getRandom);
randomsRouter.get('/number', random.getNumber);


export default randomsRouter;