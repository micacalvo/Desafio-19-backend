import twilio from 'twilio'

const accountSid = 'AC84db5c1947ddf0eda65fbccdf9e61b28';
const authToken = 'de9263a422cae9d065ab550022ac9e3d';

const client = twilio(accountSid, authToken);
    
export function sendAdminWppMessage(data) {
    const products = data.items.map((item) => item.product);
    const productsMessage = products.join(",\n");
    client.messages.create({
        from: 'whatsapp:+14155238886',
        to: 'whatsapp:+5493512905798',
        body: `Nuevo pedido de: ${data.email}.\nProductos: \n${productsMessage}.`,
    });
  }
  
  export function sendClientWppMessage(user) {
    client.messages.create({
      from: 'whatsapp:+14155238886',
      to: `whatsapp:${user.telefono}`,
      body: "¡Tu pedido ha sido realizado con exito y se encuentra en proceso!",
    });
  }

