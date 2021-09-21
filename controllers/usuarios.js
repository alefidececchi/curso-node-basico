const { response, request } = require('express'); //para que javascript identifique y añada funciones/métodos automáticamente a req/res

const usuariosGet = (req = request, res = response) => {
    
    const { q, nombre = 'no name' } = req.query;
    const params = req.params;

    res.json({
        msg: 'get API from controller',
        q,
        nombre,
        params
    });
}

const usuariosPost = (req, res) => {

    //const { nombre, apellido, edad } = req.body;
    //const { q, id, apikey } = req.query

    res.json({
        msg: 'post API from controller',
    });
}

const usuariosPut = (req = request, res) => {

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

const usuariosDelete = (req = request, res = response) => {

    const { id } = req.params

    res.json({
        msg: 'delete API from controller',
        id
    });
}

module.exports = {
    usuariosDelete,
    usuariosGet,
    usuariosPatch,
    usuariosPost,
    usuariosPut
}