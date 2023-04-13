import express from "express";
import { Server as HttpServer } from "http";
import { Server as Socket } from "socket.io";

import ProductosDaoMongodb from "../../models/daos/productos/ProductosDaoMongodb.js";
import CarritosDaoMongodb from "../../models/daos/carritos/CarritosDaoMongodb.js";
import logger from "../../config/winston.js";

const productsApi = new ProductosDaoMongodb();
const cartApi = new CarritosDaoMongodb();

const app = express();
const httpServer = new HttpServer(app);
const io = new Socket(httpServer);

export default async function configurarSocket(socket) {
//PRODUCTOS
// carga de productos
  socket.on("getProducts", async () => {
    try {
      const productsDB = await getProducts();
      socket.emit("products", productsDB);
    } catch (error) {
      logger.info(error);
    }
  });

//CARRITO
//Agregar producto al carrito
  socket.on("addProduct", async (addingProduct) => {
    try {
      const cart = await getCart(addingProduct.cartID);
      const product = await getProduct(addingProduct.productID);
      const cartItems = cart.items;
      await cartItems.push(product);

      const newCart = {
        id: addingProduct.cartID,
        items: cartItems
      }

      await cartApi.updateById(newCart);

      socket.emit("addedProduct", product);
    } catch (error) {
      logger.info(error);
    }
  });
}

async function getProducts() {
  try {
    const productsDB = await productsApi.getAll();
    return productsDB;
  } catch (error) {
    logger.info(error);
  }
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