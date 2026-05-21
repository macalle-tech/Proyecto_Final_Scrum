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
// 2. CARRITO DE COMPRAS
// =====================
let contadorCarrito = 0;
const contador = document.getElementById('contador');
const botonesAgregar = document.querySelectorAll('.producto button');

botonesAgregar.forEach(function(boton) {
    boton.addEventListener('click', function() {
        contadorCarrito++;
        contador.textContent = contadorCarrito;
    });
});

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

