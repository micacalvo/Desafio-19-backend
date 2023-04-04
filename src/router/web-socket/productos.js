import ContenedorArchivo from '../../contenedores/ContenedorArchivo.js';
const ArchivoProductos = new ContenedorArchivo("productos")
import { logError } from '../../loggers/loggers.js'

export default async function configurarSocket(socket, sockets) {
    socket.emit('productos', await ArchivoProductos.getAll());

    socket.on('update', async producto => {
        try {
            await ArchivoProductos.save(producto)
        } catch (error) {
            logError(`Error al guardar producto: ${error.message}`)
        }
        sockets.emit('productos', await ArchivoProductos.getAll());
        })
}
