
const { validationResult } = require('express-validator');
const { Order, Product, Order_Details, sequelize } = require('../models');
const AppError = require('../utils/AppError');


//para obtener todas las ordenes
const getAllOrders = async (req, res, next) => {

    try {

        const orders = await Order.findAll({
            //traemos informacion de la tabla productos, y de la tabla puente order details
            include: { model: Product, as: 'products', attributes: ['id', 'name'], through:{attributes: ['cantidad', 'precio', 'descuento']} },
            order: [['createdAt', 'DESC']]
        });
        res.json(orders)

    } catch (err) {
        next(err)
    }

}


//para obtener una orden por el id
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

//para crear una orden
const createOrder = async (req, res, next) => {

    //atrapamos los errores que hayan en la peticion
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new AppError(errors.array()[0].msg, 400))
    }

    //creamos una transaccion 
    const transaction = await sequelize.transaction();

    try {

        const {products} = req.body; //aqui va el arreglo con la informacion para la venta

        const userId = req.user.id;

        let calculoTotal = 0

        //nueva orden con el id del usuario y  valor total 0
        const nuevaOrden = await Order.create(
            { userId, total: 0 },
            { transaction }
        );


        //bluce para recorrer cada elemento de la venta
        for (const item of products) {

            //buscamos el producto por el id
            const product = await Product.findByPk(item.productId, { transaction });

            const descuentoProducto = item.descuento || 0

            if (!product) {
                throw new AppError(`El repuesto con ID ${item.productId} no existe`, 404);

            }

            //para verificar si el stock es suficiente para la cantidad solicitada
            if (product.stock < item.cantidad) {

                throw new AppError(`Stock insuficiente para el repuesto: ${product.name}`, 400)
            }

            //calculo de precio de la venta sin descuento
            const precioBruto = product.precio * item.cantidad;

            //calculo de precio de venta con descuento
            const subTotalDescuento =   precioBruto - (precioBruto * (descuentoProducto/100))

            calculoTotal += subTotalDescuento

           //definimos los detalles de la venta
            await Order_Details.create({

                orderId: nuevaOrden.id,
                productId: item.productId,
                cantidad: item.cantidad,
                precio: product.precio,
                descuento: descuentoProducto
    
            }, { transaction });

            //actualizamos el stock
            const nuevoStock = product.stock - item.cantidad;

            await product.update(
                { stock: nuevoStock },
                { transaction }
            );

        }

        //actualizamos factura
        await nuevaOrden.update(
            { total: calculoTotal},
            { transaction }
        );

        //hacemos commit de transaccion
        await transaction.commit();


        res.status(201).json({
            message: 'Orden creada exitosamente'
        });


    } catch (err) {
        //si algo sale mal, que se cancele la transaccion
        await transaction.rollback();
        next(err);

    }


};

module.exports = { getAllOrders, getOrderById, createOrder };

