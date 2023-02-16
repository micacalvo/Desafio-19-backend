import { fork } from 'child_process'
import path from 'path'

function calcular(cant) {
    return new Promise((resolve, reject) => {
        const forked = fork(path.resolve(process.cwd(), 'script/process-calcularRandoms.js'))

        forked.on('message', mensaje => {
            if (mensaje == 'Listo') {
                forked.send(cant)
            } else {
                resolve(mensaje)
            }
        })
    })
}

export { calcular }
