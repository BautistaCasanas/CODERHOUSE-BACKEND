import express from 'express';
import Info from "../controllers/Info.js"

const infoRouter = express.Router();
const info = new Info();

infoRouter.get('/', info.getInfo )





export default infoRouter;