import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productoSchema = new Schema({
    
        title: { type: String },
        price: { type: Number },
        thumbnail: { type: String }
    
})

const ProductoModel = mongoose.model('ProductoModel', productoSchema);
export default ProductoModel