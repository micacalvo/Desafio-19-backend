import mensajesApi from '../../api/mensajes.js'
import { normalizarMensajes } from '../../normalizacion/export.js'

export default async function configurarSocket(socket, sockets) {
    try {
        socket.emit('mensajes', normalizarMensajes(await mensajesApi.listarAll()));
    } catch (error) {
        logError(error.message)
        return []
    }

    socket.on('nuevoMensaje', async mensaje => {
        mensaje.date = new Date().toLocaleString()
        try {
            await mensajesApi.guardar(mensaje)
        } catch (error) {
            logError(`error al guardar producto: ${error.message}`)
        }
        sockets.emit('mensajes', normalizarMensajes(await mensajesApi.listarAll()));
    })
<<<<<<< HEAD
}

/*
export default async function configurarSocket(socket, sockets) {
    socket.emit('mensajes', normalizarMensajes(await mensajesApi.listarAll()));

    socket.on('nuevoMensaje', async mensaje => {
        mensaje.date = new Date().toLocaleString()
        await mensajesApi.guardar(mensaje)
        sockets.emit('mensajes', normalizarMensajes(await mensajesApi.listarAll()));
    })
}
*/
=======
}
>>>>>>> 1fa89d55dfbb03cb604fd2afeef45de455495b37
