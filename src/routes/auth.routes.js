
const {Router} = require('express');
const {body} = require('express-validator');
const controller = require('../controllers/auth.controller');


const router = Router();


router.post(
    '/register',
    [
        body('name').notEmpty().withMessage('El nombre es obligatorio'),
        body('email').isEmail().withMessage('Correo invalido'),
        body('password').isLength({min: 8 }).withMessage('La clave debe tener minimo 8 caracteres'),
    ],
    controller.register
);


router.post(
    '/login',
    [
        body('email').isEmail().withMessage('Correo invalido'),
        body('password').notEmpty().withMessage('la clave es obligatoria')
    ],
    controller.login
);

module.exports = router;