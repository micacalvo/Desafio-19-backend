import knex from 'knex'

class ContenedorSQL {

    constructor(config, tabla) {
        this.knex = knex(config)
        this.tabla = tabla
    }

    async getById(id) {
        try {
            return this.knex.select('*').from(this.tabla).where('id', id)
        } catch (error) {
            throw new Error(`Error al obtener por id: ${error}`)
        }
    }

    async getAll() {
        try {
            return this.knex.select('*').from(this.tabla)
        } catch (error) {
            throw new Error(`Error al obtener todo: ${error}`)
        }
    }

    async save(elem) {
        try {
            return this.knex.insert(elem).into(this.tabla)
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    async updateById(elem) {
        try {
            return this.knex.from(this.tabla).where('id', elem.id).update(elem)
        } catch (error) {
            throw new Error(`Error al actualizar: ${error}`)
        }
    }



    async deleteById(id) {
        try {
            return this.knex.delete().from(this.tabla).where('id', id)
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async deleteAll() {
        try {
            return this.knex.delete().from(this.tabla)
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async desconectar() {
        await this.knex.destroy();
    }
}

export default ContenedorSQL