
const {Router} = require('express');
const {body} = require('express-validator');
const controller = require('../controllers/products.controller');
const verifyToken = require('../middlewares/auth.middleware')
const {Category} = require('../models');
const checkRole = require('../middlewares/checkRole')


const router = Router();

//validacion de productos
const productValidations = [

    body('name').notEmpty().withMessage('El nombre es obligatorio').isString(),
    body('descripcion').optional().isString(),
    body('precio').isDecimal({min:0.01}).withMessage('El precio debe ser un numero'),
    body('stock').isInt({min:0}).withMessage('El stock no puede ser un numero negativo'),
    body('categoryId').isInt().withMessage('La categoria debe ser un numero entero')
    .custom(async(id)=>{  

        const categoryExists = await Category.findByPk(id); //para verificar que la categoria exista mediante el id

        if(!categoryExists){
            throw new Error('La categoria seleccionada no existe en el sistema')
        }

        return true;


    })

]

//validacion para el estado del producto
const productStatusValidation = body('descontinuado').notEmpty().withMessage('El campo descontinuado es obligatorio')
.isBoolean().withMessage('Valor invalido, debe ser true o false')


//para obtener todos los productos
router.get('/', controller.getAllProducts);

//para obtenerlo por id
router.get('/:id', controller.getProductById);

//para crear nuevo producto
router.post('/', verifyToken, productValidations, controller.createProduct);

//para actualizar producto
router.put('/:id', verifyToken, productValidations, controller.updateProduct);

//para modificar estado de producto(restringido, solo admin puede hacerlo)
router.patch('/:id', verifyToken, checkRole('admin'), productStatusValidation, controller.discontinueProduct);


module.exports = router;