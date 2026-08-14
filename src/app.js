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


const accessLogStream = fs.createWriteStream(

    path.join(__dirname, '..', 'logs', 'access.log'),{flags:'a'}
)


const app = express();

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 5,
    standardHeaders: true,
    message: {error: "Demasiadas peticiones, intenta mas tarde"}
})


app.use(helmet());
app.use(cors());
app.use(cors({
    origin: ['http://localhost:3001']
}));
app.use(morgan('dev'))
app.use(morgan('combined',{stream: accessLogStream}))
app.use(requesTimer);
app.use(express.json());


app.get('/', (req,res)=>{

    res.send('Bienvenid@ a HJS-PARTSTRUCK');
})
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

