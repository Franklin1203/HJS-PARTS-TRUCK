
const {Router} = require('express');
const {body} = require('express-validator');
const controller = require('../controllers/category.controller');
const verifyToken = require('../middlewares/auth.middleware');



const router = Router();


const categoryValidation = body('name').notEmpty().withMessage('El nombre es obligatorio').isString()

router.get('/', controller.getAllCategories);

router.get('/:id', controller.getCategoryById);


router.post('/', verifyToken, categoryValidation, controller.createCategory);


router.put('/:id', verifyToken, categoryValidation, controller.updateCategory);


module.exports = router;



