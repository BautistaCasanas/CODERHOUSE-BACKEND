import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const mensajeSchema = new Schema({
    message : {
        user: { type: String },
        mensaje: { type: String }
    }
})

const MensajeModel = mongoose.model('MensajeModel', mensajeSchema);
export default MensajeModel