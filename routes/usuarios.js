
const { Router } = require('express');
const { check } = require('express-validator');

const { esRoleValido, existeCorreo, existeIdUsuario } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch } = require('../controllers/usuarios');


const router = Router();

router.get('/', usuariosGet);

router.post('/', [
    //middleware para crear el error en la req si no es válido
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('correo', 'No es un correo válido').isEmail(),
    //validar si existe correo de forma personalizada
    check('correo').custom( existeCorreo ),
    check('password', 'El password debe contener al menos 6 caracteres').isLength({min: 6}),
    //check('rol', 'El rol no es válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    //validar de forma personalizada valores contra una DB
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPost); 

router.put('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( existeIdUsuario ),
    validarCampos
], usuariosPut);

router.delete('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( existeIdUsuario ),
    validarCampos
], usuariosDelete);

router.patch('/', usuariosPatch);


module.exports = router;

