import ContenedorMemoria from '../../contenedores/ContenedorMemoria.js';
const ArchivoMensajes = new ContenedorMemoria("mensajes");
import {normalizarMensajes} from '../../normalizacion/export.js';
import {logError} from '../../loggers/loggers.js';

//Mensajes 
async function manejarEnvíoDeMensajes() {
    try {
        const mensajes = await ArchivoMensajes.getAll()
        return normalizarMensajes(mensajes)
    } catch (error) {
        logError(error.message)
        return []
    }
}

export default async function configurarSocket(socket, sockets) {
    socket.emit('mensajes', await manejarEnvíoDeMensajes());

    socket.on('nuevoMensaje', async mensaje => {
        mensaje.date = new Date().toLocaleString()
        await ArchivoMensajes.save(mensaje)
        sockets.emit('mensajes', await manejarEnvíoDeMensajes());
    })
}