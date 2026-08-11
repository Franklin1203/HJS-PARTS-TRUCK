
const jwt = require('jsonwebtoken');
const AppError = require('../utils/AppError');


const verifyToken = (req,res,next) =>{

    const authHeader = req.header('Authorization');


    if(!authHeader || !authHeader.startsWith('Bearer ')){
        return next(new AppError('Token no proporcionado',401))
    }

    const token = authHeader.split(' ')[1];


    try{

        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {id: payload.sub, role: payload.role};
        next();

    }catch(err){
        return next(new AppError('Token invalido o expirado',401));

    }

};

module.exports = verifyToken;