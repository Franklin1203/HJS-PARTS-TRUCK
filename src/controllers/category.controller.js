
const {validationResult} = require('express-validator');
const AppError = require('../utils/AppError');
const {Category} = require('../models');


//para obtener todas categorias activas
const getAllCategories = async (req,res,next) =>{

    try{

        const categories = await Category.findAll({

            where:{
                descontinuada: false
            },
            attributes: ['id','name'] 

        })

        res.json(categories);

    }catch(err){

        next(err)

    }


};

//para obtener categoria por id
const getCategoryById = async (req,res, next) =>{

        try{

            const category = await Category.findByPk(req.params.id);
            if(!category) return next(new AppError('Categoria no encontrada',404));

            res.json(category);


        }catch(err){

            next(err)

        }

};

//para crear categoria
const createCategory = async (req,res,next) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new AppError(errors.array()[0].msg,400));
    }

    try{

        const {name} = req.body

        const newCategory = await Category.create({
            name
        });

        res.status(201).json(newCategory);

    }catch(err){

        next(err)

    }


}

//para actualizar categoria
const updateCategory = async (req,res,next) =>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return next(new AppError(errors.array()[0].msg,400))
    }

    try{

        const category = await Category.findByPk(req.params.id);
        if(!category) return next(new AppError('Categoria no encontrada',404));

        await category.update(req.body);

        res.json(category)

    }catch(err){
        next(err)
    }


};


module.exports = {getAllCategories, getCategoryById, createCategory, updateCategory}







