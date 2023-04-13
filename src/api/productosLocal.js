import config from '../config/config.js'

<<<<<<< HEAD
import ContenedorArchivo from '../models/containers/ContenedorArchivo.js'

const productosApi = new ContenedorArchivo(`${config.fileSystem.path}/products.json`)
=======
import ContenedorArchivo from '../models/contenedores/ContenedorArchivo.js'

const productosApi = new ContenedorArchivo(`${config.fileSystem.path}/productos.json`)
>>>>>>> 1fa89d55dfbb03cb604fd2afeef45de455495b37

export default productosApi