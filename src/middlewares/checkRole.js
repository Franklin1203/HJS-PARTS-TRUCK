
const AppError = require('../utils/AppError');

//para verificar los roles
const checkRole = (...allowedRoles) => (req,res, next) =>{

    //verificamos si el usuario esta autenticado
    if(!req.user){
        return next(new AppError('Usuario no autenticado',401));
    };

    //verificamos que el usuario tenga el rol admitido 
    if(!allowedRoles.includes(req.user.role)){
        return next(new AppError('No tienes permisos para realizar esta accion',403));
    }

    next();

};

module.exports = checkRole;