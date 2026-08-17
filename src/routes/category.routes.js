
const {Router} = require('express');
const {body} = require('express-validator');
const controller = require('../controllers/category.controller');
const verifyToken = require('../middlewares/auth.middleware');



const router = Router();

//validacio de categoria
const categoryValidation = body('name').notEmpty().withMessage('El nombre es obligatorio').isString()

//ruta para obtener categoria
router.get('/', controller.getAllCategories);

//ruta para obtener por id
router.get('/:id', controller.getCategoryById);

//ruta para crear
router.post('/', verifyToken, categoryValidation, controller.createCategory);

//ruta para editar
router.put('/:id', verifyToken, categoryValidation, controller.updateCategory);


module.exports = router;



