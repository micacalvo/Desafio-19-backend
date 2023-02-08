import dotenv from 'dotenv';
import minimist from 'minimist';
dotenv.config()

//Configuro el parametro de minimist para el puerto del servidor
const argv = minimist(process.argv.slice(2), { alias:{p: 'port' }, default:{ PORT: 8080}})

export const config = {
    db: {
        client: 'sqlite3',
        connection: {
            filename: `./db/dbmica.sqlite`
        },
        useNullAsDefault: true,
        
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            password: 'srbrisa14',
            database: 'testmica',
            port: '8889'
        }, 
    server: {
        PORT: argv.PORT
    }
}
}    

