//Faker
import faker from 'faker';
faker.locale ='es';

// Inicio faker

function createProductos(n) {
    const productos = []
    for (let i = 1; i <= n; i++) {
        const prod = createProductoNew(i)
        productos.push(prod)
    }
    return productos
}

function createProductoNew(id) {
    const prod = {
        title: faker.commerce.product(),
        price: faker.commerce.price(),
        thumbnail: faker.image.imageUrl()
        }
    if (id) {
        prod.id = id
    }
    return prod
}
    
export {
createProductoNew,
createProductos    
} 