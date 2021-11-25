const Role = require("../models/role");
const Usuario = require('../models/usuario');



const esRoleValido = async (rol = '') => {
    const existeRole = await Role.findOne({ rol });
    if (!existeRole) {
        throw new Error(`El rol '${rol}' no existe en la DB`);
    };
};

const existeCorreo = async( correo = '' ) => {

    const existeCorreo = await Usuario.findOne({ correo });
    if (existeCorreo) {
        throw new Error(`El correo: ${ correo } ya existe :(`)
    }
};

const existeIdUsuario = async( id ) => {

    const existeId = await Usuario.findById( id );
    if( !existeId ) {
        throw new Error(`El id ${id} no existe en la DB`);
    }


}

module.exports = {
    esRoleValido,
    existeCorreo,
    existeIdUsuario
}