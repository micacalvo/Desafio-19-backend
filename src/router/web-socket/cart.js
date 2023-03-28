import express from "express";
import { Server as HttpServer } from "http";
import { Server as Socket } from "socket.io";

import ProductosDaoMongodb from "../../models/daos/productos/ProductosDaoMongodb.js";
import CarritosDaoMongodb from "../../models/daos/carritos/CarritosDaoMongodb.js";
import UsuariosDaoMongodb from "../../models/daos/usuarios/UsuariosDaoMongodb.js";

import { sendAdminWppMessage, sendClientWppMessage } from "../../utils/twilio/twilio.js";
import { sendMailNewCart } from "../../utils/nodemailer/nodemailer.js";
import logger from "../../config/winston.js";

const productsApi = new ProductosDaoMongodb();
const cartApi = new CarritosDaoMongodb();
const usersApi = new UsuariosDaoMongodb();

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

export default async function configurarSocket(socket) {
//CARRITO
// Carga de productos
  socket.on("getItemsCart", async (userEmail) => {
    try {
      const cart = await getCart(userEmail);
      const cartItems = cart.items;

      socket.emit("itemsCart", cartItems);
    } catch (error) {
      logger.info(error);
    }
  });

// Eliminar producto del carrito
  socket.on("deleteProduct", async (deleteProduct) => {
    try {
      const cart = await getCart(deleteProduct.cartID);
      const product = await getProduct(deleteProduct.productID);
      const cartItems = cart.items;

      const newCartItems = await cartItems.filter(
        (item) => item.id !== product.id
      );

      const newCart = {
        id: deleteProduct.cartID,
        items: newCartItems,
      };
      await cartApi.updateById(newCart);

      const updateCart = await getCart(newCart.id);
      const updateCartItems = updateCart.items;
      socket.emit("itemsCart", updateCartItems);
    } catch (error) {
      logger.info(error);
    }
  });

// Realizar compra
  socket.on("makePruchase", async (userEmail) => {
    try {
      const cart = await getCart(userEmail);
      const purchase = {
        email: userEmail,
        items: cart.items,
      };
      const client = await getClient(userEmail);

      sendAdminWppMessage(purchase);
      sendMailNewCart(client, purchase);

      sendClientWppMessage(client);

      const newCart = {
        id: userEmail,
        items: [],
      };

      await cartApi.updateById(newCart);
      socket.emit("purchaseMade");
    } catch (error) {
      logger.info(error);
    }
  });
}

async function getCart(cartID) {
  try {
    const cart = await cartApi.getById(cartID);
    return cart[0];
  } catch (error) {
    logger.info(error);
  }
}

async function getProduct(productID) {
  try {
    const product = await productsApi.getById(productID);
    return product[0];
  } catch (error) {
    logger.info(error);
  }
}

async function getClient(userEmail) {
  try {
    const usersDB = await usersApi.getAll();
    const client = usersDB.filter((user) => user.email == userEmail);
    return client[0];
  } catch (error) {
    logger.info(error);
  }
}