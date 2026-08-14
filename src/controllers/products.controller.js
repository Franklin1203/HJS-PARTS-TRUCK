
const { validationResult } = require('express-validator');
const { Product, Category } = require('../models');
const AppError = require('../utils/AppError');





const getAllProducts = async (req, res, next) => {

    try {

        const products = await Product.findAll({
            include: { model: Category, as: 'category', attributes: ['id', 'name'] },
            order: [['createdAt', 'DESC']],
        });
        res.json(products);

    } catch (err) {
        next(err)
    }

};

const getProductById = async (req, res, next) => {

    try {

        const product = await Product.findByPk(req.params.id);
        if (!product) return next(new AppError('Producto no encontrado', 404));
        res.json(product);

    } catch (err) {

        next(err)

    }

};


const createProduct = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new AppError(errors.array()[0].msg, 400))
    }

    try {

        const { name, description, precio, stock, categoryId } = req.body

        const newProduct = await Product.create({
            name,
            description,
            precio,
            stock,
            categoryId

        });

        res.status(201).json(newProduct);

    } catch (err) {

        next(err);

    }


};


const updateProduct = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new AppError(errors.array()[0].msg, 400));
    }

    try {

        const product = await Product.findByPk(req.params.id);
        if (!product) return next(new AppError('Producto no encontrado', 404))

        await product.update(req.body);
        res.json(product)

    } catch (err) {

        next(err);

    };


};


const discontinueProduct = async (req, res, next) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next(new AppError(errors.array()[0].msg, 400));
        }

        const product = await Product.findByPk(req.params.id)
        if (!product) return next(new AppError('Producto no encontrado', 404));

        const { descontinuado } = req.body
        await product.update({descontinuado})
        res.json(product);

    } catch (err) {

        next(err)

    }

};


module.exports = { getAllProducts, getProductById, createProduct, updateProduct, discontinueProduct }








