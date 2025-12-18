const productos = [
    { id: 1, nombre: "Lattafa Yara 100ml", precio: 40000, imagen: "../img/yara.jpg" },
    { id: 2, nombre: "Club de Nuit EDT", precio: 40000, imagen: "../img/clubdenuit.jpg" },
    { id: 3, nombre: "Animale men EDT", precio: 40000, imagen: "../img/animale.jpg" },
    { id: 4, nombre: "Honor and Glory", precio: 40000, imagen: "../img/badeealoud.jpg" },
    { id: 5, nombre: "Emper Stallion", precio: 40000, imagen: "../img/emperstallion.jpg" },
    { id: 6, nombre: "Versace Eros Flame", precio: 40000, imagen: "../img/versaceflame.jpg" }
];

let carrito = JSON.parse(localStorage.getItem("carrito"));
if (!carrito) {
    carrito = [];
}

function cargarProductos() {
    const contenedor = document.getElementById("lista-productos");

    if (!contenedor) {
        return;
    }

    let html = "";

    for (let i = 0; i < productos.length; i++) {
        html += `
            <div class="producto border border-warning">
                <h3>${productos[i].nombre}</h3>
                <img src="${productos[i].imagen}" alt="${productos[i].nombre}">
                <p>$${productos[i].precio}</p>
                <button class="btn btn-dark" id="btn-${productos[i].id}">Agregar</button>
            </div>
        `;
    }

    contenedor.innerHTML = html;

    for (let i = 0; i < productos.length; i++) {
        let boton = document.getElementById("btn-" + productos[i].id);
        boton.addEventListener("click", function() {
            agregarAlCarrito(productos[i].id);
        });
    }
}

function agregarAlCarrito(idProducto) {
    let productoAgregado = null;

    for (let i = 0; i < productos.length; i++) {
        if (productos[i].id == idProducto) {
            productoAgregado = productos[i];
        }
    }

    if (productoAgregado) {
        carrito.push(productoAgregado);

        localStorage.setItem("carrito", JSON.stringify(carrito));

        mostrarCarrito();

        const mensaje = document.getElementById("mensaje-carrito");
        if (mensaje) {
            mensaje.innerText = "Agregaste: " + productoAgregado.nombre;
            mensaje.classList.remove("d-none");

            setTimeout(function () {
                mensaje.classList.add("d-none");
            }, 3000);
        }
    }
}

function mostrarCarrito() {
    const divCarrito = document.getElementById("mi-carrito");

    if (!divCarrito) {
        return;
    }

    if (carrito.length == 0) {
        divCarrito.innerHTML = "<h3>Carrito vacio</h3>";
        return;
    }

    let htmlCarrito = "<h3>Tus Compras:</h3><ul class='list-group'>";
    let total = 0;

    for (let i = 0; i < carrito.length; i++) {
        htmlCarrito += `<li class='list-group-item'>${carrito[i].nombre} - $${carrito[i].precio}</li>`;
        total = total + carrito[i].precio;
    }

    htmlCarrito += "</ul>";
    htmlCarrito += "<p class='mt-3 fw-bold'>Total a pagar: $" + total + "</p>";
    htmlCarrito += "<button class='btn btn-danger' onclick='borrarCarrito()'>Borrar todo</button>";

    divCarrito.innerHTML = htmlCarrito;
}

function borrarCarrito() {
    carrito = [];
    localStorage.removeItem("carrito");
    mostrarCarrito();
}

const formulario = document.getElementById("form-contacto");

if (formulario) {
    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const nombreUsuario = document.getElementById("nombre").value;

        const mensaje = document.getElementById("mensaje-exito");
        mensaje.innerText = "¡Gracias " + nombreUsuario + ", mensaje enviado con exito!";
        mensaje.classList.remove("d-none");

        formulario.reset();
    });
}

cargarProductos();
mostrarCarrito();
