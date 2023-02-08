// CLASE QUE CONTIENE CRUD SQL
import config from '../config.js';

class ContenedorSql {
//C
async save(producto) {
        const ids = await config('productos').insert(producto);
        return ids  
}

//R
async getAll() {
    return config('productos').select('*').limit(15)
}

async getById(id) {
    return config('productos').where("id", id).select('*')
}

//U
async updateById(id, producto) {
    const idUp = await config('productos').where("id", id).update(producto)
    return idUp;
}

//D
async deleteById(id) {
    return config('productos').where("id", id).del();
}
}

export default ContenedorSql;
