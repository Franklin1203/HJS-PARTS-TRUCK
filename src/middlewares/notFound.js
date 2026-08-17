
const AppError = require('../utils/AppError');

//manejar error en caso de ruta no existente
const notFound = (req, res, next) =>{

    next(new AppError(`Ruta no encontrada: ${req.method} ${req.originalUrl}`,404));

};

module.exports = notFound;