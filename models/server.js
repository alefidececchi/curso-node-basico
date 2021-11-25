require('dotenv').config();
const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');
const { options } = require('../routes/usuarios.js');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Conectar a base de datos
        this.conectarDB();

        //Middlewares: funcion que se ejecuta antes de seguir con la ejecucion de las peticiones, es decir,
        //antes de llegar a la DB
        this.middlewares();

        //Rutas de acceso
        this.routes();
    }

    async conectarDB() {

        await dbConnection();
    }

    middlewares() {

        //CORS: para autorizar las páginas desde donde se deben hacer las peticiones
        this.app.use(cors());
        //Parsea JSON, existen muchos middlewares para parsear diferentes formatos
        //JSON es la forma más común de comunicar frontend & backend
        this.app.use( express.json()); 
        //Directorio público
        this.app.use(express.static('public'));
    }

    routes() {

        this.app.use(this.usuariosPath, require('../routes/usuarios.js'));
        
    }

    listen() {
        
        this.app.listen(this.port, () => {
            console.log('Corriendo en el puerto', this.port);
        });
    }
}

module.exports = Server;