/* import { productosDao } from "../../src/daos/daos.js";

//Mostramos los productos en el html
const render = async () => {
    const productos = await productosDao.getAll();
    console.log(productos);
    const html = productos
        .map((producto) => {
            return `
        <div class="card" style="width: 18rem;">
            <img src="${producto.thumbnail}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${producto.title}</h5>
                <p class="card-text">${producto.price}</p>
                <a href="#" class="btn btn-primary cart" id="${producto.id}">
                Agregar al carrito</a>
            </div>
        </div>
        `;
        })
        .join("");
    document.getElementById("productos").innerHTML = html;
}

render();
 */