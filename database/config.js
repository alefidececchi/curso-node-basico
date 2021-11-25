require('dotenv').config();
require('colors');
const mongoose = require('mongoose'); //Modelador de objetos de informacion que se manejan en MongoDB


const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.MONGODB_CNN);

        console.log('Connected to DATABASE'.green);

    } catch (error) {
        console.log(error);
        throw Error('Error al conectar con Base de Datos'.red);
    }
}

module.exports = {
    dbConnection
}