import knex from 'knex'
import config  from '../src/config.js';

//Función autoejecutable. Creación de tablas

(async() => {
    try {
        const clientConnection= knex(config.mariaDb)
        await clientConnection.schema.dropTableIfExists('productos');
        await clientConnection.schema.dropTableIfExists('mensajes');

    //Creación de las dos tablas
        await clientConnection.schema.createTable("productos", (table) => {
            table.increments("id").primary();
            table.string("name");
            table.integer("price");
        });

        await clientConnection.schema.createTable("mensajes", (table) => {
            table.increments("id").primary();
            table.string("user");
            table.string("message");
        }); 

        console.log("Tablas creadas con éxito")
    }
    
    catch(error){
        console.log("No se pudieron crear las tablas");
    }
    /* finally{
        clientConnection.destroy();
        sqlite3.destroy();
    } */
})();