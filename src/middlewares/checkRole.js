
const AppError = require('../utils/AppError');


const checkRole = (...allowedRoles) => (req,res, next) =>{

    if(!req.user){
        return next(new AppError('Usuario no autenticado',401));
    };

    if(!allowedRoles.includes(req.user.role)){
        return next(new AppError('No tienes permisos para realizar esta accion',403));
    }

    next();

};

module.exports = checkRole;