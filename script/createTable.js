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
            table.increments(id).primary();
            table.string("name");
            table.integer(price);
        });

        await clientConnection.schema.createTable("mensajes", (table) => {
            table.increments(id).primary();
            table.string("user");
            table.string("message");
        }); 

        console.log("Tablas creadas con éxito")
    
    
    //Pusheo los datos que ya tengo en formato txt
    console.log('insertando registros');
    const productos = [
        {
            title: "Camisa",
            price: 1050,
            thumbnail: "https://www.pinterest.es/pin/376754325072744239/"
        },
        {
            title: "Jean id Leg",
            price: 6700,
            thumbnail: "https://www.pinterest.es/pin/619456123762995958/"
        },
        {
            title: "Bikini",
            price: 2500,
            thumbnail: "https://www.pinterest.es/pin/4785143347468621/"
        },
        {
            title: "Musculosa Algondón",
            price: 1390,
            thumbnail: "https://www.pinterest.es/pin/658721883016194487/"
        }
        ]
        await clientConnection('productos').insert(productos)

        const mensajes = [
            {
              user: "mica@hotmail.com",
              date: "24/6/2022 19:57:22",
              message: "Bienvenidos"
            },
            {
              user: "mauri@mail.com",
              date: "11/6/2022 20:28:23",
              message: "Probando"
            },
            {
              user: "ana@hotmail.com",
              date: "11/5/2022 19:31:42",
              message: "Hola como va?"
            },
            {
              user: "aldo@hotmail.com",
              date: "12/01/2022 23:29:00",
              message: "Hola"
            }
          ];
        await clientConnection('mensajes').insert(mensajes)

        //Mostramos lo guardado
        console.log('Los registros guardados son los siguientes...');
        const result1 = await clientConnection('productos').select('*')
        const result2 = await clientConnection('mensajes').select('*')
        console.log(result1);
        console.log(result2);
}
    catch(error){
        console.log("No se pudieron crear las tablas");
    }
    /* finally{
        clientConnection.destroy();
        sqlite3.destroy();
    } */
})();