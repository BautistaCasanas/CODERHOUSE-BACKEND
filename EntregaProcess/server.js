/* -- DEPENDENCIAS -- */
import express from 'express';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from 'socket.io';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import flash from 'connect-flash'
import morgan from 'morgan';
import dotenv from 'dotenv';
dotenv.config();
import('./passport/passport.js')

/* -- Importacion de Rutas -- */
import router from './routes/productos.routes.js';
import routerMsg from './routes/mensajes.routes.js';
import usersRoutes from './routes/users.routes.js';
import infoRouter from './routes/info.routes.js';
import randomsRouter from "./routes/randoms.routes.js";

import Mensaje from './controllers/Mensaje.js';
import Producto from './controllers/Producto.js';

const msg = new Mensaje();
const prodClass = new Producto();

// COMIENZO APP
/* -- CONFIG DEL SERVER -- */
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const PORT = process.env.PORT || 8080;

/* -- MIDDLEWARES -- */
app.use(cookieParser())
app.use(session({
    secret: 'secreto',
    rolling: true,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000 // tiempo en milisegundos (10 min = 60000 ms * 10)
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static('public'));
app.use(flash())
app.use((req, res,next) => {
    res.locals.user = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    res.locals.welcome = req.flash('welcome')
    next()
})

/* -- EJS -- */
app.set('views', './views');
app.set('view engine', 'ejs')

/* -- ENDPOINTS -- */
app.use('/api/productos', router);
app.use('/mensajes', routerMsg);
app.use('/user', usersRoutes);
app.use('/info', infoRouter);
app.use('/randoms', randomsRouter);
app.get('/', function (req, res) { res.render('index') });


/* -------------------- Web Sockets ---------------------- */

let toChat = []

io.on('connection', socket => {
    console.log(`Cliente ID:${socket.id} inició conexión`)
    io.sockets.emit('new-message-server', toChat)

    socket.on('new-message', async data => {
        const message = await data;
        toChat.push(data);
        msg.addMsg({ message })
        io.sockets.emit('new-message-server', toChat)
    });

    socket.on('new-producto', async data => {
        const producto = await data;
        prodClass.add({ producto })
        io.sockets.emit('new-prod-server', producto)
    });

});



/* ---- SERVIDOR ---- */
const server = httpServer.listen(PORT, () => {
    console.log(`** Servidor HTTP en puerto: ${server.address().port}`);
})
server.on("error", error => console.log(`Error en servidor ${error}`));