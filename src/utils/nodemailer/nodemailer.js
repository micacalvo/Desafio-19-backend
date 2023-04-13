import { createTransport } from 'nodemailer';
import { userMailAdmin, passMailAdmin } from '../../config/config.js';

const transporter = createTransport({
    service: 'hotmail',
    port: 995,
    auth: {
        user: userMailAdmin,
        pass: passMailAdmin
    }
});

export function sendMailNewUser(client) {
    const mailOptions = {
      from: "Servidor Node.js",
      to: userMailAdmin,
      subject: "Nuevo usuario registrado",
      html: `<h1>${client.nombre} se ha registrado.</h1>
          <p>Nombre: ${client.nombre}</p>
          <p>Direccion: ${client.direccion}</p>
          <p>Edad: ${client.edad}</p>
          <p>Telefono: ${client.telefono}</p>
          <p>Email: ${client.email}</p>`,
    };
  
    transporter.sendMail(mailOptions);
  }
  
  export function sendMailNewCart(client, purchase) {
      const products = purchase.items.map((item) => item.product);
      const productsMessage = products.join(", <br>");
  
      const mailOptions = {
        from: "Servidor Node.js",
        to: userMailAdmin,
        subject: `Nuevo pedido de ${client.nombre}`,
        html: `<h1>Nuevo pedido de ${client.nombre}</h1>
            <p><strong>Productos: </strong> ${productsMessage}</p>`,
      };
    
      transporter.sendMail(mailOptions);
    }
  
