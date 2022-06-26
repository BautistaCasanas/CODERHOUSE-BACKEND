import mongoose from 'mongoose';

export default class EcommerceDbConnect {

    constructor() {
        this.connection = this.createConnection()
    }

    createConnection() {
        const uri = 'mongodb+srv://admin1:admin1@ecommerce.c98cs.mongodb.net/?retryWrites=true&w=majority'
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