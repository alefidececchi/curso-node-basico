const { response } = require('express'); //para que javascript identifique y añada funciones/métodos automáticamente a req/res

const usuariosGet = (req, res = response) => {
    res.json({
        msg: 'get API from controller'
    });
}

const usuariosPost = (req, res) => {

    //const { nombre, apellido, edad } = req.body;
    //const { q, id, apikey } = req.query

    res.json({
        msg: 'post API from controller',
    });
}

const usuariosPut = (req, res) => {

    const id = req.params.id;

    res.json({
        msg: 'put API from controller',
        id
    });
}

const usuariosPatch = (req, res) => {
    res.json({
        msg: 'patch API from controller'
    });
}

const usuariosDelete = (req, res) => {
    res.json({
        msg: 'delete API from controller'
    });
}

module.exports = {
    usuariosDelete,
    usuariosGet,
    usuariosPatch,
    usuariosPost,
    usuariosPut
}