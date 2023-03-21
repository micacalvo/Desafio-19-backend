import { carritosDao, usuariosDao } from "../daos/daos.js"
import { sendMailNewCart } from "../auth/nodemailer.js"
import { sendMessageNewCart } from "../auth/twilio.js"

let carritos = []  //Para los carritos que esten generando los usuarios

export const getCartController = async (req, res) => {
    if (req.isAuthenticated()) {
        const nombre = (await usuariosDao.getAll(req.session.passport.user))[0].name
        let miCarrito = carritos.find(carrito => carrito.user === req.session.passport.user)

        res.redirect('cart.html', {
            nombre: nombre,
            carrito: miCarrito,
            active: 'cart'
        })
    } else {
        res.redirect('/login.html')
    }
}

export const postCartAddProductController = (req, res) => {
    if (req.isAuthenticated()) {

        const price = global.productos.find(producto => producto.id === req.body.producto.id).price
        const title = global.productos.find(producto => producto.id === req.body.producto.id).title
        let miCarrito = carritos.find(carrito => carrito.user === req.session.passport.user)
        if (!miCarrito) {
            miCarrito = {}
            miCarrito.user = req.session.passport.user
            miCarrito.productos = []
            miCarrito.total = 0
        }

        miCarrito.total += Number(req.body.producto.cantidad) * price
        miCarrito.productos.push({ ...req.body.producto, title: title, price: price })

        const index = carritos.findIndex(carrito => carrito.user === req.session.passport.user)
        if (index == -1) {
            carritos.push(miCarrito)
        } else {
            carritos[index] = miCarrito
        }

    } else {
        res.redirect('/login.html')
    }
}

export const deleteCartProductController = async (req, res) => { //Por params mando el id del producto que deseo eliminar
    if (req.isAuthenticated()) {

        let miCarrito = carritos.find(carrito => carrito.user === req.session.passport.user)
        let index = miCarrito.productos.findIndex(producto => producto.id === req.params.id) //Indice del producto a eliminar

        miCarrito.total -= miCarrito.productos[index].price * miCarrito.productos[index].cantidad //Resto el precio del producto a eliminar
        miCarrito.productos.splice(index, 1)//Elimino el producto del array miCarrito.productos
        index = carritos.findIndex(carrito => carrito.user === req.session.passport.user)  //Indice de miCarrito
        carritos[index] = miCarrito// Actualizo carritos

        res.redirect('/cart.html')
    } else {
        res.redirect('/login.html')
    }
}

export const postCartBuyController = async (req, res) => {
    if (req.isAuthenticated()) {

        const usuario = await usuariosDao.getAll(req.session.passport.user)
        let miCarrito = carritos.find(carrito => carrito.user === req.session.passport.user)

        await carritosDao.save(miCarrito)

        sendMailNewCart(usuario[0].name, usuario[0].email, miCarrito)// Envio mail al admin con la nueva compra
        sendMessageNewCart(usuario[0].name, usuario[0].email, miCarrito)// Envio whatsapp al admin con la nueva compra

        const index = carritos.findIndex(carrito => carrito.user === req.session.passport.user) //Indice de miCarrito
        carritos.splice(index, 1)// Elimino el carrito completo porque ya se realizo la compra

        res.redirect('/cart.html')

    } else {
        res.redirect('/login.html')
    }
}
