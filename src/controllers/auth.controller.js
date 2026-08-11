const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator');
const {User} = require('../models');
const AppError = require('../utils/AppError');


const sigToken = (user) =>

    jwt.sign({sub: user.id, role: user.role}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
    });


const register = async (req, res, next) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new AppError(errors.array()[0].msg,400));
    }

    const {name, email, password} = req.body;


    try{

        const existing = await User.findOne({where:{email}});
        if(existing){
            return next(new AppError('Ya existe un usuario con ese email',409))
        }

        const passwordHash = await bcrypt.hash(password,10);

        const user = await User.create({name, email, passwordHash});

        const token = sigToken(user);

        res.status(201).json({
            user: {id: user.id, name: user.name, email: user.email, role: user.role,},
            token,
        });


    }catch(err){
        next(err);
    }

};



const login = async (req, res, next) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new AppError(errors.array()[0].msg,400));
    };

    const {email, password} = req.body;


    try{

        const user = await User.findOne({where:{email}});
        if(!user){
            return next(new AppError('Credenciales invalidas',401))
        }


        const passwordMatches = await bcrypt.compare(password, user.passwordHash);
        if(!passwordMatches){
            return next(new AppError('Credenciales invalidas',401));
        }

        const token = sigToken(user);

        res.json({
            user: {id: user.id, name: user.name, email: user.email, role: user.role}, token
        });
    }catch(err){
        next(err);
    }

}

module.exports = {register, login}
