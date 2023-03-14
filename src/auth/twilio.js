import twilio from 'twilio'
import {twilioSID, twilioToken, twilioWhatsAppPhoneNumber, adminWhatsAppPhoneNumber, adminPhoneNumber, twilioPhoneNumber} from '../config.js'
import { logInfo, logError } from '../loggers/loggers.js'

const client = twilio(twilioSID, twilioToken)

//Mensaje de texto
export const sendSMSNewUser = async (newUser) => {

    const msg = `NUEVO USUARIO REGISTRADO
    NAME: ${newUser.name}
    DIRECCION: ${newUser.address}
    EDAD: ${newUser.age}
    TELEFONO: ${newUser.phone}
    EMAIL: ${newUser.email}`

    try {
        const message = await client.messages.create({
            body: msg,
            from: twilioPhoneNumber,
            to: adminPhoneNumber // Uso numero de Admin porque tiene que ser numero validado por twilio
        })
        logInfo(`SMS cart send`, message)

    } catch (error) {
        logError(error)
    }
}

//Mensaje de Wsp
export const sendWhatsAppNewUser = async (newUser) => {

    const msg = `NUEVO USUARIO REGISTRADO
    NAME: ${newUser.name}
    DIRECCION: ${newUser.address}
    EDAD: ${newUser.age}
    TELEFONO: ${newUser.phone}
    EMAIL: ${newUser.email}`

    try {
        const message = await client.messages.create({
            body: msg,
            from: twilioWhatsAppPhoneNumber,
            to: `Whatsapp:${adminWhatsAppPhoneNumber}`
        })
        logInfo('WhatsApp new user send', message)
        } catch (error) {
        logError('Error al enviar', error)
    }
}

export const sendMessageNewCart = async (name, email, cart) => {  // Funcion que envia whatsApp y SMS con nuevo carrito comprado

    let listaProductosCarrito = `NUEVO CARRITO de ${name} (email: ${email}) \n`
    cart.productos.forEach(element => {
        listaProductosCarrito += `${element.title}   $${element.price} x ${element.cantidad} \n`
    });

    const msg = listaProductosCarrito + 'Total: $' + cart.total


    //Envio de Wsp
    try {
        const message = await client.messages.create({
            body: msg,
            from: twilioWhatsAppPhoneNumber,
            to: `Whatsapp:${adminWhatsAppPhoneNumber}`
        })
        logInfo('WhatsApp new cart send', message)
    } catch (error) {
        logError('Error al enviar WSP new cart', error)
    }
    //Envio de SMS
    try {
        const message = await client.messages.create({
            body: msg,
            from: twilioPhoneNumber,
            to: adminPhoneNumber
        })

        logInfo('SMS new cart send', message)

    } catch (error) {
        logError('Error al enviar SMS new cart', error)
    }
}