/* //Muestra los productos en el Html
let id = ''

document.querySelectorAll(".cart").forEach(
    row => {
        row.addEventListener("click", e => {
            id = e.currentTarget.getAttribute("id");
            console.log(id);
        });
    });

const btnBorrar = document.getElementById('btnBorrar')
btnBorrar.addEventListener('click', async e => {

    let response = await fetch('/cart/deleteProduct/' + id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json ; charset=utf-8'
        },
        //body: JSON.stringify({id: id})
    }).then(res => location.reload())
})

const btnComprar = document.getElementById('btnComprar')
btnComprar.addEventListener('click', async e => {

    let response = await fetch('/cart/buy', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json ; charset=utf-8'
        },
        body: JSON.stringify({ buy: 'compra' })
    }).then(res => location.reload())

    console.log('btnComprar')
})
 */