<<<<<<< HEAD
/* import { fork } from 'child_process'
import path from 'path'

=======
>>>>>>> 1fa89d55dfbb03cb604fd2afeef45de455495b37
// SOLO PARA ESTE DESAFIO: 
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
<<<<<<< HEAD
    // return new Promise((resolve, reject) => {
    //     const forked = fork(path.resolve(process.cwd(), 'scripts/calcularRandoms.js'))

    //     forked.on('message', mensaje => {
    //         if (mensaje == 'ready') {
    //             forked.send(cant)
    //         } else {
    //             resolve(mensaje)
    //         }
    //     })
    // })
=======
>>>>>>> 1fa89d55dfbb03cb604fd2afeef45de455495b37
    const randoms = calcularRandoms(cant)
    return Promise.resolve(randoms)
}

<<<<<<< HEAD
export { calcular } */
=======
export { calcular }
>>>>>>> 1fa89d55dfbb03cb604fd2afeef45de455495b37
