import axios from "axios"

<<<<<<< HEAD
const API_URL = 'http://localhost:8080'
=======
const API_URL = 'http://localhost:8081'
>>>>>>> 1fa89d55dfbb03cb604fd2afeef45de455495b37

const obtenerProductos = async () => {
    return await axios.get(`${API_URL}/apiProductos`)
        .then(response => {
            return response
        })
        .catch(error => {
            console.error(error)
        })
}

const agregarProducto = async (producto) => {
    return await axios.post(`${API_URL}/apiProductos`, producto)
        .then(response => {
            return response
        })
        .catch(error => {
            console.error(error)
        })  
}

const actualizarProducto = async (id, producto) => {
    return await axios.put(`${API_URL}/apiProductos/${id}`, producto)
        .then(response => {
            return response
        })
        .catch(error => {
            console.error(error)
        })
}

const eliminarProducto = async (id) => {
    return await axios.delete(`${API_URL}/apiProductos/${id}`)
        .then(response => {
            return response
        })
        .catch(error => {
            console.error(error)
        })
}

export {
    obtenerProductos,
    agregarProducto,
    actualizarProducto,
    eliminarProducto
}
