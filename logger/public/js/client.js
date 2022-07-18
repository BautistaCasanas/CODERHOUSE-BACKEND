const socket = io.connect();

/* ---------------- CHAT ----------------------- */

let pantalla = document.getElementById('pantalla'); // referencia del btn que envia los msg
let botonChat = document.getElementById('btnChat'); // referencia del btn que envia los msg
botonChat.addEventListener('click', () => { validar() }); // al apretar el boton ejecuta la fn valida()

// Funcion que valida que los input no esten vacios y si estan OK envia la informacion al server
function validar() {
    let user = document.getElementById('userChat').value;
    let mensaje = document.getElementById('messageChat').value;
    if (mensaje === "" || user === "") {
        alert(`CAMPOS REQUERIDOS`);
    } else {
        let nuevoMensaje = {
            user: document.getElementById('userChat').value,
            mensaje: document.getElementById('messageChat').value
        };
        socket.emit('new-message', nuevoMensaje);
        document.getElementById('messageChat').value = "";
    };
};

// Generar la fecha
let date = new Date()
newDate = [
    date.getDate(),
    date.getMonth() + 1,
    date.getFullYear()].join('/') + ' ' +
    [date.getHours(),
    date.getMinutes(),
    date.getSeconds()].join(':');


//Funcion que renderiza el array que viene del server para poder ser visto en el document

function renderMessage(data) {
    let html = data.map((elem, i) => {
        return (`
        <div>
        Usuario: <strong style="color:blue">${elem.user}</strong></span>
        (a las <span>${newDate.toString()}</span>)
        dijo: <i style="color:green">${elem.mensaje}</i></div>`);
    }).join(' ');
    document.getElementById('pantalla').innerHTML = html;
};

socket.on('new-message-server', (data) => {
    renderMessage(data);
});


// trar mensajes en DB
function oldMsg(data) {
    let html2 = data.map((elem, i) => {
        return (`
        <div>
        Usuario: <strong style="color:blue">${elem.message.user}</strong></span>
        (a las <span>${newDate.toString()}</span>)
        dijo: <i style="color:green">${elem.message.mensaje}</i></div>`);
    }).join(' ');
    document.getElementById('pantallaOld').innerHTML = html2;
};

document.getElementById("btnOldMsg").addEventListener("click", function () {
    fetch('http://localhost:8080/mensajes')
        .then(res => res.json())
        .then(data => oldMsg(data))
        .catch(err => console.log(err))
});

/* -------------------  PRODUCTOS -------------------------- */

// ENVIAR PRODUCTOS POR SOCKET
document.getElementById('btnForm').addEventListener('click', () => { validarForm() }); // al apretar el boton ejecuta la fn valida()

// Funcion que valida que los input no esten vacios y si estan OK envia la informacion al server
function validarForm() {
    let title = document.getElementById('title').value;
    let price = document.getElementById('price').value;
    let thumbnail = document.getElementById('thumbnail').value;
    if (title === "" || price === "" || thumbnail === "") {
        alert(`CAMPOS REQUERIDOS PARA AGREGAR PRODUCTO`)
    } else {
        let newProd = {
            title: document.getElementById('title').value,
            price: document.getElementById('price').value,
            thumbnail: document.getElementById('thumbnail').value
        };
        socket.emit('new-producto', newProd)
        
        document.getElementById('title').value = ""
        document.getElementById('price').value = ""
        document.getElementById('thumbnail').value = ""
    };
};


// GET 
const fragment = document.createDocumentFragment();
const tabla = document.getElementById('tableProd');
const template = document.getElementById('templateList').content;

// Traer productos
document.addEventListener('DOMContentLoaded', e => { fetchData() });

const fetchData = async () => {
    const res = await fetch('http://localhost:8080/api/productos');
    const data = await res.json();
    console.log(data)
    verProdHtml(data);
};

const verProdHtml = data => {
    data.forEach(producto => {

        template.getElementById('prodTitle').textContent = producto.title;
        template.getElementById('prodPrice').textContent = producto.price;
        template.getElementById('prodImg').setAttribute("src", producto.thumbnail);

        const clone = template.cloneNode(true)
        fragment.appendChild(clone)
    });
    tabla.appendChild(fragment)
};


socket.on('new-prod-server', async data => {
    let array = [] 
    array.push(await data)
    verProdHtml(array)
    
})