/*
    El punto de acceso a la aplicación,
    se llama al servidor y escucha en el puerto definido
    en las variables de entorno.
*/
import {config} from 'dotenv';
import Server from './config/server.js';

// Configuraciones del servidor
config();

// Iniciar el servidor
const server = new Server();

// Escuchar peticiones
server.listen();