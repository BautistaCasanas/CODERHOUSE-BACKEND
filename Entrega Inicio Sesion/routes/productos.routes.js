import express from 'express';
import Producto from '../controllers/Producto.js';
import { validate } from '../passport/auth.js'
const router = express.Router();
const nuevoProducto = new Producto();


router.post('/', validate, nuevoProducto.add);
router.get('/', validate, nuevoProducto.findAll);
router.get('/:id', validate, nuevoProducto.findByID);
router.delete('/:id', validate, nuevoProducto.deleteProd);
router.put('/:id', validate, nuevoProducto.update);



export default router;