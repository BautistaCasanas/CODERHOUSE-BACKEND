import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();


export default class EcommerceDbConnect {

    constructor() {
        this.connection = this.createConnection()
    }

    createConnection() {
        const uri = process.env.MONGO_URL;
        const options = {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        }
        mongoose.connect(uri, options)
            .then(() => { console.log('Conectado a Mongo') },
                err => { err }
            )
    }
}