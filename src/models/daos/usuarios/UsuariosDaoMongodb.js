import ContenedorMongodb from '../../contenedores/ContenedorMongodb.js';
import UsuariosSchema from '../../schemas/usuariosSchema.js';

class UsuariosDao extends ContenedorMongodb {
  constructor() {
    super(UsuariosSchema);
    this.contenedor = ContenedorMongodb.getInstance();
    this.contenedor.conectarDB();
  }

  //Si quiero usar una funcion de la clase padre, tengo que utilizarla como promesa y usar .then()

  async buscarUsuarioPorEmail(email) {
    try {
      const usuario = await UsuariosSchema.findOne({ email });
      return usuario;
    } catch (error) {
      console.error('Error al buscar usuario por email:', error);
      throw error;
    }
  }

  async registrarUsuario(usuario) {
    try {
      const userExist = await UsuariosSchema.findOne({ email: usuario.email });
      if (userExist) return false;
      usuario.password = objectUtils.createHash(usuario.password);
      const newUser = new UsuariosSchema(usuario);
      await newUser.save();
      return true;
    } catch (error) {
      console.error('Error al registrar usuario:', error);
      throw error;
    }
  }
}

export default UsuariosDao;
