
const errorHandler = (err, req, res, next) =>{

    const statusCode = err.statusCode || 500;
    const message = err.isOperational ? err.message : 'Error interno del servidor';

    if(!err.isOperational){
        console.error(err);
    }

    res.status(statusCode).json({
        error: message,
    });


};

module.exports = errorHandler;