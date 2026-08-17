const express = require('express');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/products.routes');
const orderRoutes = require('./routes/order.routes');
const categoryRoutes = require('./routes/category.routes');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');
const helmet = require('helmet')
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const { default: rateLimit } = require('express-rate-limit');
const requesTimer = require('./middlewares/requestTimer');
const { uptime } = require('process');

//para almacenar info de peticiones en archivo
const accessLogStream = fs.createWriteStream(

    path.join(__dirname, '..', 'logs', 'access.log'),{flags:'a'}
)


const app = express();

//para controlar la cantidad de peticiones
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    message: {error: "Demasiadas peticiones, intenta mas tarde"}
})


app.use(helmet()); //seguridad de los datos
app.use(cors({
    origin: ['http://localhost:3001'] //para controlar el origen del cliente
}));

//para registro de info de peticiones
app.use(morgan('dev'))
app.use(morgan('combined',{stream: accessLogStream}))
app.use(requesTimer); 
app.use(express.json());


app.get('/', (req,res)=>{

    res.send('Bienvenid@ a HJS-PARTSTRUCK');  //la pantalla de inicio al iniciar el servidor
})


app.get('/health', (req,res)=>{ //para verificar salud del servidor
    res.json({status: 'ok', uptime: process.uptime()})
})

//para controlar peticiones con limiter
app.use('/auth',  limiter);
app.use('/auth',  authRoutes);

app.use('/product',  limiter);
app.use('/product', productRoutes);

app.use('/order',  limiter);
app.use('/order', orderRoutes);

app.use('/category',  limiter);
app.use('/category', categoryRoutes);


app.use(notFound);
app.use(errorHandler);

module.exports = app

