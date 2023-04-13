/* import twilio from 'twilio'
//import {twilioSID, twilioToken, twilioMessagingServiceSid, twilioWhatsAppPhoneNumber, adminWhatsAppPhoneNumber, adminPhoneNumber, twilioPhoneNumber} from '../config.js'
import { logInfo, logError } from '../loggers/loggers.js'

const accountSid = 'AC84db5c1947ddf0eda65fbccdf9e61b28';
const authToken = 'de9263a422cae9d065ab550022ac9e3d';

const client = twilio(accountSid, authToken);
    
export const sendSMSNewUser = async (newUser) => {
    const msg = `NUEVO USUARIO REGISTRADO
    NOMBRE: ${newUser.name}
    DIRECCION: ${newUser.address}
    EDAD: ${newUser.age}
    TELEFONO: ${newUser.phone}
    EMAIL: ${newUser.email}`

    try {
        const message = await client.messages.create({
            body: msg,
            from: '+15076688868',
            to: '+5493512905798'               
        })
        logInfo(message)
    } catch (error) {
        logError(error)
    }
}

export const sendWhatsAppNewUser = async (newUser) => {

    const msg = `NUEVO USUARIO REGISTRADO
    NOMBRE: ${newUser.name}
    DIRECCION: ${newUser.address}
    EDAD: ${newUser.age}
    TELEFONO: ${newUser.phone}
    EMAIL: ${newUser.email}`

    try {
        const message = await client.messages.create({
            body: msg,
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+5493512905798'
        })
        logInfo(message)
    } catch (error) {
        logError(error)
    }
}

export const sendMessageNewCart = async (name, email, cart) => {  

    let listaProductosCarrito = `NUEVO CARRITO de ${name} (email: ${email} ) \n`
    cart.productos.forEach(element => {
        listaProductosCarrito += `${element.title}   $${element.price} x ${element.cantidad} \n`
    });

    const msg = listaProductosCarrito + 'Total: $' + cart.total

//Envio de Wsp
    try {
        const message = await client.messages.create({
            body: msg,
            from: 'whatsapp:+14155238886',
            to: 'whatsapp:+5493512905798'
        })
        logInfo(message)
    } catch (error) {
        logError(error)
    }
//Envio de SMS
    try {
        const message = await client.messages.create({
            body: msg,
            from: 'whatsapp:+14155238886',
            to: '+5493512905798'
        })
        logInfo(message)
    } catch (error) {
        logError(error)
    }
}



     */