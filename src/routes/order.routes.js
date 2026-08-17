
const {Router} = require('express');
const {body} = require('express-validator');
const controller = require('../controllers/order.controller');
const verifyToken = require('../middlewares/auth.middleware');


const router = Router();

router.use(verifyToken);

//ruta para obtener todas las ordenes
router.get('/',  controller.getAllOrders);

//ruta para obtener orden por id
router.get('/:id', controller.getOrderById);

router.post(
    '/',
    [
        body('products').exists().withMessage('Debes enviar una lista de repuestos')
        .isArray({min: 1}).withMessage('La orden debe tener al menos un repuesto'),

        //recorre cada producto y lo valida
        body('products.*.productId').isInt().withMessage('Id invalido, debe ser un numero entero'),

        body('products.*.cantidad').isInt({min: 1}).withMessage('La cantidad debe ser al menos 1'),

        body('products.*.descuento').optional().isFloat({min:0, max:100}).withMessage('El descuento debe ser un porcentaje entre 0 y 100')
    ],
   controller.createOrder

)

module.exports = router;







