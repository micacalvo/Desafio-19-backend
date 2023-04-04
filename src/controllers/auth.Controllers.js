import { createHash } from "../utils/bcrypt/bcrypt.js";
import { sendMailNewUser } from "../utils/nodemailer/nodemailer.js";

 import CarritosDaoMongodb from "../models/daos/carritos/CarritosDaoMongodb.js";
import UsuariosDaoMongodb from "../models/daos/usuarios/UsuariosDaoMongodb.js";

const cartApi = new CarritosDaoMongodb();
const usersApi = new UsuariosDaoMongodb();

export const getLogin = async (req, res) => {
    res.redirect("/login.html");
}

export const getLogout = async (req, res) => {
    if (!req.session.passport?.user) {
        res.redirect("/login.html");
    } else {
        res.redirect("/logout.html", {
            nombre: req.session.passport?.user.nombre,
        });
    }
}

export const getLoginError = async (req, res) => {
    res.redirect("/login-error.html");
}

export const getSignin = async (req, res) => {
    res.redirect("/register.html");
}

export const postSignin = async (req, res) => {
    const { nombre, direccion, edad, telefono, foto, email, password } = req.body;
    const usersDb = await usersApi.getAll();
    const userExist = usersDb.find((usr) => usr.email == email);

    if (userExist) {
        res.redirect("/register-error.html");
    } else {
        const newUser = {
            nombre,
            direccion,
            edad,
            telefono: req.body.telefono,
            foto: req.body.fileName,
            email,
            password: await createHash(password),
        };
        const cart = {
            id: email,
            items: [],
        };

        await usersApi.save(newUser).then((res) => {
            cartApi.save(cart);
            sendMailNewUser(newUser);
        });

        res.redirect("/login");
    }
}