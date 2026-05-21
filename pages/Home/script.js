// =====================
// 1. FILTRO DE PRODUCTOS
// =====================
const botonesFiltro = document.querySelectorAll('.filtros button');
const productos = document.querySelectorAll('.producto');

botonesFiltro.forEach(function(boton) {
    boton.addEventListener('click', function() {
        const categoria = boton.textContent.toLowerCase();

        productos.forEach(function(producto) {
            const categoriaProducto = producto.getAttribute('data-categoria');

            if (categoria === 'todos') {
                producto.style.display = 'block';
            } else if (categoriaProducto === categoria) {
                producto.style.display = 'block';
            } else {
                producto.style.display = 'none';
            }
        });
    });
});

// =====================
// 2. CARRITO COMPLETO
// =====================
let carrito = [];
const contador = document.getElementById('contador');
const panelCarrito = document.getElementById('panel-carrito');
const listaCarrito = document.getElementById('lista-carrito');
const totalCarrito = document.getElementById('total');
const cerrarCarrito = document.getElementById('cerrar-carrito');
const iconoCarrito = document.querySelector('.carrito');

// Abrir y cerrar panel
iconoCarrito.addEventListener('click', function() {
    panelCarrito.classList.toggle('abierto');
});

cerrarCarrito.addEventListener('click', function() {
    panelCarrito.classList.remove('abierto');
});

// Agregar producto al carrito
const botonesAgregar = document.querySelectorAll('.producto button');

botonesAgregar.forEach(function(boton) {
    boton.addEventListener('click', function() {
        const tarjeta = boton.closest('.producto');
        const nombre = tarjeta.querySelector('h3').textContent;
        const precioTexto = tarjeta.querySelector('.precio').textContent;
        const precio = parseInt(precioTexto.replace(/\D/g, ''));

        const productoExistente = carrito.find(function(item) {
            return item.nombre === nombre;
        });

        if (productoExistente) {
            productoExistente.cantidad++;
        } else {
            carrito.push({ nombre: nombre, precio: precio, cantidad: 1 });
        }

        actualizarCarrito();
        panelCarrito.classList.add('abierto');
    });
});

// Actualizar panel carrito
function actualizarCarrito() {
    listaCarrito.innerHTML = '';
    let total = 0;

    carrito.forEach(function(item, index) {
        total += item.precio * item.cantidad;

        const li = document.createElement('li');
        li.innerHTML = item.nombre + ' x' + item.cantidad +
            ' - $' + (item.precio * item.cantidad).toLocaleString() +
            '<button onclick="eliminarProducto(' + index + ')">Eliminar</button>';
        listaCarrito.appendChild(li);
    });

    contador.textContent = carrito.reduce(function(acc, item) {
        return acc + item.cantidad;
    }, 0);

    totalCarrito.textContent = '$' + total.toLocaleString();
}

// Eliminar producto
function eliminarProducto(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

// =====================
// 3. VALIDACIÓN FORMULARIO
// =====================
const formulario = document.querySelector('form');

formulario.addEventListener('submit', function(evento) {
    evento.preventDefault();

    const nombre = document.querySelector('input[type="text"]').value;
    const correo = document.querySelector('input[type="email"]').value;
    const mensaje = document.querySelector('textarea').value;

    if (nombre === '' || correo === '' || mensaje === '') {
        alert('Por favor completa todos los campos');
    } else {
        const mensajeWhatsApp = 'Hola! Soy ' + nombre + ' (' + correo + '). Mi pedido: ' + mensaje;
        const urlWhatsApp = 'https://wa.me/573117351221?text=' + encodeURIComponent(mensajeWhatsApp);
        window.open(urlWhatsApp, '_blank');
        formulario.reset();
    }
});

