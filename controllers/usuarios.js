const bcryptjs = require('bcryptjs');
const { response, request } = require('express'); //para que javascript identifique y añada funciones/métodos automáticamente a req/res


const Usuario = require('../models/usuario');


const usuariosGet = async(req = request, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    
    /*
    ***
    const usuarios = await Usuario.find({ estado: true })
        .skip(Number(from))
        .limit(Number(limit));

    const total = await Usuario.countDocuments({ estado: true });
    */
    
    
    const [ usuarios, total ] = await Promise.all([
        Usuario.find({ estado: true })
        .skip(Number(from))
        .limit(Number(limit)),
        Usuario.countDocuments({ estado: true })
    ]);

    res.json({
        total,
        usuarios    
    });
}

const usuariosPost = async(req = request, res = response) => {

    const { nombre, correo, password, rol } = req.body;

    const usuario = new Usuario({
        nombre,
        correo,
        password,
        rol
    });

    //encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //guardar en dB
    await usuario.save();

    res.json({
        usuario
    })
};

const usuariosPut = async(req = request, res = response) => {

    const { id } = req.params;

    const { google, password, ...updateData } = req.body;

    if (password) {
        //encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        updateData.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, updateData, { new: true });

    res.json({
        usuario
    });


}

const usuariosPatch = (req = request, res = response) => {
    res.json({
        msg: 'patch API from controller'
    });


}

const usuariosDelete = async(req = request, res = response) => {

    const { id } = req.params;

    /**
    *** PARA ELIMINAR FISICAMENTE DE LA BASE DE DATOS
    const usuario = await Usuario.findByIdAndDelete( id ); 
    */

    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false }, { new: true });

    res.json({
        msg: `el usuario ${usuario.nombre} fue eliminado de la DB `,
        usuario
    });
}

module.exports = {
    usuariosDelete,
    usuariosGet,
    usuariosPatch,
    usuariosPost,
    usuariosPut
}