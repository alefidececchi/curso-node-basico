
const { Router } = require('express');

const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch } = require('../controllers/usuarios');

const router = Router();

router.get('/:id/:dni', usuariosGet);

router.post('/', usuariosPost);

router.put('/:id', usuariosPut);

router.delete('/delete/:id', usuariosDelete);

router.patch('/', usuariosPatch);


module.exports = router;

