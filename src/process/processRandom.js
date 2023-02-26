import { fork } from 'child_process'
import path from 'path'

//Desafio 14
function calcularRandoms(cant) {
    const numbers = {}
    for (let i = 0; i < cant; i++) {
        const randomNumber = Math.floor(Math.random() * 1000)
        if (!numbers[ randomNumber ]) {
            numbers[ randomNumber ] = 0
        }
        numbers[ randomNumber ]++
    }
    return numbers
}

function calcular(cant) {
    /* return new Promise((resolve, reject) => {
        const forked = fork(path.resolve(process.cwd(), 'script/process-calcularRandoms.js'))

        forked.on('message', mensaje => {
            if (mensaje == 'Listo') {
                forked.send(cant)
            } else {
                resolve(mensaje)
            }
        })
    }) */
    const randoms = calcularRandoms(cant)
    return Promise.resolve(randoms)
}

export { calcular }
