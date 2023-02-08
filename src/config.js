import dotenv from 'dotenv';
dotenv.config()

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
            NODE_ENV: process.env.NODE_ENV || 'DEV',
            HOST: process.env.NODE_HOST || '127.0.0.1',
            PORT: process.env.NODE_PORT || 3000
        }
        
}
}    

