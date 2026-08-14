
const { validationResult } = require('express-validator');
const { Order, Product, Order_Details, sequelize } = require('../models');
const AppError = require('../utils/AppError');



const getAllOrders = async (req, res, next) => {

    try {

        const orders = await Order.findAll({

            include: { model: Product, as: 'products', attributes: ['id', 'name'], through:{attributes: ['cantidad', 'precio', 'descuento']} },
            order: [['createdAt', 'DESC']]
        });
        res.json(orders)

    } catch (err) {
        next(err)
    }

}

const getOrderById = async (req, res, next) => {

    try {

        const order = await Order.findByPk(req.params.id,{
            include: {
                model: Product,
                as: 'products',
                attributes: ['id','name'],
                through: {
                    attributes: ['cantidad', 'precio', 'descuento']
                }
            }
        });
        if (!order) return next(new AppError('Orden no encontrada', 404));
        res.json(order)

    } catch (err) {

        next(err)

    }

}


const createOrder = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new AppError(errors.array()[0].msg, 400))
    }


    const transaction = await sequelize.transaction();

    try {

        const { products } = req.body;

        const userId = req.user.id;

        let calculoTotal = 0

        const nuevaOrden = await Order.create(
            { userId, total: 0 },
            { transaction }
        );


        for (const item of products) {

            const product = await Product.findByPk(item.productId, { transaction });

            if (!product) {
                throw new AppError(`El repuesto con ID ${item.productId} no existe`, 404);

            }

            if (product.stock < item.cantidad) {

                throw new AppError(`Stock insuficiente para el repuesto: ${product.name}`, 400)
            }

            const subTotal = product.precio * item.cantidad;
            calculoTotal += subTotal

            await Order_Details.create({

                orderId: nuevaOrden.id,
                productId: item.productId,
                cantidad: item.cantidad,
                precio: product.precio

            }, { transaction });


            const nuevoStock = product.stock - item.cantidad;

            await product.update(
                { stock: nuevoStock },
                { transaction }
            );

        }
        await nuevaOrden.update(
            { total: calculoTotal },
            { transaction }
        );


        await transaction.commit();


        res.status(201).json({
            message: 'Orden creada exitosamente'
        });


    } catch (err) {

        await transaction.rollback();
        next(err);

    }


};

module.exports = { getAllOrders, getOrderById, createOrder };

