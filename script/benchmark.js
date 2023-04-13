//Configuracion de Autocannon
import autocannon from 'autocannon';
import {PassThrough} from 'stream'; //Esto es para lo del stremer

//Función que me pide la URL
const run = (url) => {
    const buf = [];
    const outputStream = new PassThrough();

    // Formato
    const inst = autocannon({
        url,
        connections: 100,
        duration: 20,
    });

    // Va estar haciendo simulaciones en tiempo real
    autocannon.track(inst, { outputStream });

    outputStream.on("data", (data) => {
        buf.push(data);
    });

    // Crea una grafica
    inst.on("done", () => {
        process.stdout.write(Buffer.concat(buf));
    });
};

console.log("Running all benchmarks in parallei...");
run("http://localhost:8081/info");