import MensajeModel from '../models/mensajeSchema.js';
import EcommerceDbConnect from '../config/mongooseEcommerce.js';

class Mensaje {

    constructor () {
        this.cxn = new EcommerceDbConnect()
    }

       async addMsg(req, res) {
        try {
            if (!req) {
                return res.status(404).json({ mensaje: 'Error al agregar un producto' })
            }
            const data = await { ...req }
            const newMsg = await MensajeModel.create(data);
        } catch (error) {
            console.log(error);
        }
    }

    async findAllMsg(req, res) {
        try {
            let msgInDb = await MensajeModel.find();
            return res.status(200).json(msgInDb);
        } catch (error) {
            return res.status(400).json({ mensaje: 'Ocurrió un error', error })
        }
    }
}

export default Mensaje;