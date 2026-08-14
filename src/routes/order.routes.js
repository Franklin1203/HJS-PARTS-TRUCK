
const {Router} = require('express');
const {body} = require('express-validator');
const controller = require('../controllers/order.controller');
const verifyToken = require('../middlewares/auth.middleware');


const router = Router();

router.use(verifyToken);


router.get('/',  controller.getAllOrders);

router.get('/:id', controller.getOrderById);

router.post(
    '/',
    [
        body('products').exists().withMessage('Debes enviar una lista de repuestos')
        .isArray({min: 1}).withMessage('La orden debe tener al menos un repuesto'),

        body('products.*.productId').isInt().withMessage('Id invalido, debe ser un numero entero'),

        body('products.*.cantidad').isInt({min: 1}).withMessage('La cantidad debe ser al menos 1')
    ],
   controller.createOrder

)

module.exports = router;







