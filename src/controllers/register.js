import { usuariosDao } from "../daos/daos.js"
import { sendMailNewUser } from "../auth/nodemailer.js"
import { sendWhatsAppNewUser, sendSMSNewUser } from "../auth/twilio.js"

export const postRegisterController = async (req, res) => {
    const usuarios = await usuariosDao.getAll()
    const email = req.body.email
    const password = req.body.password
    if (usuarios.find(usuario => usuario.email == email)) {
        req.session.message = "Este email ya se encuentra registrado, prueba con otro"
        
    } else {
        const newUser = {
            name: req.body.nombre,
            address: req.body.direccion,
            age: req.body.edad,
            email: email,
            password: password,
            photo: req.body.fileName,
            phone: '+1' + req.body.telefono
        }
        await usuariosDao.save(newUser).then(res => {
            sendMailNewUser(newUser)
            sendWhatsAppNewUser(newUser)
            sendSMSNewUser(newUser)
        })
        res.redirect('/login.html')
    }
}

export const getRegisterController = (req, res) => {
    res.redirect('/register.html')
}