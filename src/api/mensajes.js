import config from '../config/config.js'

<<<<<<< HEAD
import ContenedorArchivo from '../models/containers/ContenedorArchivo.js'
=======
import ContenedorArchivo from '../models/contenedores/ContenedorArchivo.js'
>>>>>>> 1fa89d55dfbb03cb604fd2afeef45de455495b37

const mensajesApi = new ContenedorArchivo(`${config.fileSystem.path}/mensajes.json`)

export default mensajesApi