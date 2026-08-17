
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');

//para verificar token
const verifyToken = (req,res,next) =>{

    //verificamos que el header contenga la clave Authorizacion
    const authHeader = req.header('Authorization'); 

    //validamos que el header contenga el token
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return next(new AppError('Token no proporcionado',401))
    }

    //extraemos el token de la cabecera
    const token = authHeader.split(' ')[1];


    
    try{
        //creamos el payload
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {id: payload.sub, role: payload.role};
        next();

    }catch(err){
        return next(new AppError('Token invalido o expirado',401));

    }

};

module.exports = verifyToken;