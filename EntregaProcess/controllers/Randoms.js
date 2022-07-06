import { fork } from 'child_process';
import path from 'path';

class Random {

    getRandom(req, res) {
        res.render('random');
    }

    getNumber(req, res) {
        let param = req.query.number;

        const child = fork('./n.js');

        child.send({ 'number': parseInt(param) })
        child.on('message', data => res.send(data));  
    }
}

export default Random