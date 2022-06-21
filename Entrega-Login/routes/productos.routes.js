import express from 'express';
import Producto from '../controllers/Producto.js';
const router = express.Router();
const nuevoProducto = new Producto();


router.post('/', nuevoProducto.add);
router.get('/', nuevoProducto.findAll);
router.get('/:id', nuevoProducto.findByID);
router.delete('/:id', nuevoProducto.deleteProd);
router.put('/:id', nuevoProducto.update);



export default router;