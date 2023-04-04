import config from '../config/config.js'

import ContenedorArchivo from '../models/contenedores/ContenedorArchivo.js'

const productosApi = new ContenedorArchivo(`${config.fileSystem.path}/productos.json`)

export default productosApi