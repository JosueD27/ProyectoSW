// Importamos las librerias
const express = require('express');
const path = require('path');
const http = require('http');
var cors = require('cors');
var bodyParser = require("body-parser");

// ############################

// Crear el servidor Express
const app = express();
// #######################


// Cors
app.use(cors());
app.options('*', cors());
// ##########

// Asignar BodyParser
app.use(bodyParser.urlencoded({
    extended: false
}));
// #####

// BodyParser tipo = json
app.use(bodyParser.json());
// #########

// LLamado de referencia al archivo controller.js
const ControllerApi = require('./server/controller');
// #########

// asignamos URL a funciones controler.js
app.use('/api', ControllerApi);
// #############

// Funcion de captura de errores
app.use(function(err, req, res, next) {
    if (err.return) {
        res.json(err);
    } else {
        console.error(err);
        res.status(500).send({
            message: 'Internal Server Error'
        });
    }
})
// #############


// Designar host y puerto
const port = process.env.PORT || '8200';
app.set('port', port);
app.set('host', '127.0.0.1');
// ################

// Levantar servidor
const server = http.createServer(app);
server.listen(port, () => console.log(`Running on 127.0.0.1:${port}`));
// #################