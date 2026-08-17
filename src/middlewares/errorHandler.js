
const errorHandler = (err, req, res, next) =>{

    //definimos el status del error
    const statusCode = err.statusCode || 500;

    //definimos el mensaje a mostrar sea el error esperado o interno del servidor
    const message = err.isOperational ? err.message : 'Error interno del servidor';

    //si el error no fue esperado, entonces que lo muestre en la consola
    if(!err.isOperational){
        console.error(err);
    }

    res.status(statusCode).json({
        error: message,
    });


};

module.exports = errorHandler;