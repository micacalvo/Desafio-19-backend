import ContenedorMemoria from '../../contenedores/ContenedorMemoria.js';
const ArchivoMensajes = new ContenedorMemoria("mensajes")
import {normalizarMensajes} from '../../normalizacion/export.js'

//Mensajes 

export default async function configurarSocket(socket, sockets) {
    socket.emit('mensajes', normalizarMensajes(await ArchivoMensajes.getAll()));

    socket.on('nuevoMensaje', async mensaje => {
        mensaje.date = new Date().toLocaleString()
        await ArchivoMensajes.save(mensaje)
        sockets.emit('mensajes', normalizarMensajes(await ArchivoMensajes.getAll()));
    })
}
