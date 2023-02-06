import ContenedorArchivo from '../../contenedores/ContenedorArchivo.js';
const ArchivoProductos = new ContenedorArchivo("productos")

export default async function configurarSocket(socket, sockets) {
    socket.emit('productos', await ArchivoProductos.getAll());

    socket.on('update', async producto => {
        await ArchivoProductos.save(producto)
        sockets.emit('productos', await ArchivoProductos.getAll());
    })
}
