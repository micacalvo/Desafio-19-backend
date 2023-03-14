//Comunicación con websocket
// Establecemos la comunicacion del lado del cliente 
const socket = io.connect()

// Selecciono el form completo y hacemos un preventDefault
const formAgregarProducto = document.getElementById('formAgregarProducto')
formAgregarProducto.addEventListener('submit', e => {
    e.preventDefault()
    const producto = {
        title: formAgregarProducto[0].value,
        price: formAgregarProducto[1].value,
        thumbnail: formAgregarProducto[2].value
    }
    socket.emit('update', producto);
    formAgregarProducto.reset()
})

// Renderizamos los productos en el html
socket.on('productos', productos => {
    makeHtmlTable(productos).then(html => {
        document.getElementById('productos').innerHTML = html
    })
});

async function makeHtmlTable(productos) {
      const html = {productos};
      return thml
}

//Desnormalización de mensajes
// Definimos un esquema de autor
const authorSchema = new normalizr.schema.Entity('authors',{}, {idAttribute:"mail"});

// Definimos un esquema de mensaje
const textSchema = new normalizr.schema.Entity('text');

// Definimos un esquema de posts
const mensajeSchema = new normalizr.schema.Entity('messages', {
    author: authorSchema,
    text: [textSchema]
})

// Chat websocket
const inputUsername = document.getElementById('username')
const inputMensaje = document.getElementById('inputMensaje')
const btnEnviar = document.getElementById('btnEnviar')

// Selecciono el form completo y procedemos a hacer un prevent default
const formPublicarMensaje = document.getElementById('formPublicarMensaje')
formPublicarMensaje.addEventListener('submit', e => {
    e.preventDefault()
    
    const mensaje = {
      author: {
          mail: inputUsername.value,
          name: document.getElementById('firstname').value,
          lastName: document.getElementById('lastname').value,
          age: document.getElementById('age').value,
          username: document.getElementById('alias').value,
          avatar: document.getElementById('avatar').value
      },
      text: inputMensaje.value
  }

  socket.emit('nuevoMensaje', mensaje);
  formPublicarMensaje.reset()
  inputMensaje.focus()
})

socket.on('mensajes', mensajesN => {
  // Desnormalizamos los mensajes recibidos por el socket y los integramos al html
  let mensajesDenormalized = normalizr.denormalize(mensajesN.result, [mensajeSchema], mensajesN.entities)
  const html = makeHtmlList(mensajesDenormalized)
  document.getElementById('mensajes').innerHTML = html;
  
  // Guardamos el tamaño de la data y hacemos el porcentaje
  let mensajesNsize = JSON.stringify(mensajesN).length
  console.log(mensajesN, mensajesNsize);
  let mensajesDsize = JSON.stringify(mensajesDenormalized).length
  console.log(mensajesDenormalized, mensajesDsize);
  
  // Logica del porcentaje
  let porcentajeC = parseInt((mensajesNsize * 100) / mensajesDsize)
  console.log(`Porcentaje de compresión ${porcentajeC}%`)
  document.getElementById('compresion-info').innerText = porcentajeC
  })
  
  // Funcion del html para integrar todos los datos de lo recibido por el socket
  function makeHtmlList(mensajes) {
    return mensajes.map(mensaje => {
        return (`
        <div>
            <b style="color:blue;">${mensaje.author.mail}</b>
            [<span style="color:brown;">${mensaje.date}</span>] :
            <i style="color:green;">${mensaje.text}</i>
            <img width="50" src="${mensaje.author.avatar}" alt=" ">
        </div>
    `)
    }).join(" ");
}

inputUsername.addEventListener('input', () => {
  const hayEmail = inputUsername.value.length
  const hayTexto = inputMensaje.value.length
  inputMensaje.disabled = !hayEmail
  btnEnviar.disabled = !hayEmail || !hayTexto
})

inputMensaje.addEventListener('input', () => {
  const hayTexto = inputMensaje.value.length
  btnEnviar.disabled = !hayTexto
})