//Normalizr
import { normalize, schema} from 'normalizr';

//Definimos un esquemas de autores
const authorSchema = new schema.Entity('authors', {}, {idAttribute:"mail"});
//Esquemas de mensajes
const textSchema = new schema.Entity('text');
//Esquema de posts
const mensajeSchema = new schema.Entity('messages', {
    author: authorSchema,
    text: [textSchema]
});

const normalizarMensajes = (mensajesConId) => normalize(mensajesConId, [mensajeSchema])

export {normalizarMensajes}