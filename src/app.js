const express = require('express');
const authRoutes = require('./routes/auth.routes');
const notFound = require('./middlewares/notFound');
const errorHandler = require('./middlewares/errorHandler');


const app = express();

app.use(express.json());


app.get('/', (req,res)=>{

    res.send('Bienvenid@ a HJS-PARTSTRUCK');
})

app.use('/auth', authRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app

