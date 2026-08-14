
const {Router} = require('express');
const {body} = require('express-validator');
const controller = require('../controllers/products.controller');
const verifyToken = require('../middlewares/auth.middleware')
const {Category} = require('../models');
const checkRole = require('../middlewares/checkRole')


const router = Router();


const productValidations = [

    body('name').notEmpty().withMessage('El nombre es obligatorio').isString(),
    body('descripcion').optional().isString(),
    body('precio').isDecimal().withMessage('El precio debe ser un numero'),
    body('stock').isInt({min:0}).withMessage('El stock no puede ser un numero negativo'),
    body('categoryId').isInt().withMessage('La categoria debe ser un numero entero')
    .custom(async(id)=>{

        const categoryExists = await Category.findByPk(id);

        if(!categoryExists){
            throw new Error('La categoria seleccionada no existe en el sistema')
        }

        return true;


    })

]


const productStatusValidation = body('descontinuado').notEmpty().withMessage('El campo descontinuado es obligatorio')
.isBoolean().withMessage('Valor invalido, debe ser true o false')



router.get('/', controller.getAllProducts);

router.get('/:id', controller.getProductById);

router.post('/', verifyToken, productValidations, controller.createProduct);

router.put('/:id', verifyToken, productValidations, controller.updateProduct);

router.patch('/:id', verifyToken, checkRole('admin'), productStatusValidation, controller.discontinueProduct);


module.exports = router;