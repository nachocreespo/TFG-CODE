let carrito = [];

// introducir producto al carrito
function agregarProducto(nombre, precio) {
    let productoExistente = carrito.find(producto => producto.nombre === nombre);

    if (productoExistente) {
        // Si el producto ya está 
        productoExistente.cantidad += 1;
    } else {
        // Si el producto no está 
        let producto = {
            nombre: nombre,
            precio: precio,
            cantidad: 1
        };
        carrito.push(producto);
    }
    
    mostrarConfirmacion();
    mostrarCarrito();
}

//  mensaje de confirmación
function mostrarConfirmacion() {
    let confirmacion = document.getElementById('confirmacion');
    confirmacion.style.display = 'block';

    // Ocultar 
    setTimeout(function() {
        confirmacion.style.display = 'none';
    }, 3000); 
}

// contenido del carrito
function mostrarCarrito() {
    let carritoContenido = document.getElementById('carritoDesplegable');
    let listaProductos = document.getElementById('lista-productos');
    let totalPrecio = document.getElementById('total');

    listaProductos.innerHTML = '';
    carrito.forEach(producto => {
        let li = document.createElement('li');
        li.textContent = `${producto.nombre} x${producto.cantidad} - €${(producto.precio * producto.cantidad).toFixed(2)}`;
        listaProductos.appendChild(li);
    });

    // Calcular precio total
    let total = calcularTotal();
    totalPrecio.textContent = `${total.toFixed(2)}€`;
    

    carritoContenido.style.display = 'block';
}

//  precio total 
function calcularTotal() {
    let total = 0;
    carrito.forEach(producto => {
        total += producto.precio * producto.cantidad;
    });
    return total;
}

//  botones de ejemplo
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('carritoTexto').addEventListener('click', function() {
        let carritoContenido = document.getElementById('carritoDesplegable');
        if (carritoContenido.style.display === 'block') {
            carritoContenido.style.display = 'none';
        } else {
            carritoContenido.style.display = 'block';
        }
    });

    document.getElementById('btnAgregarProducto1').addEventListener('click', () => agregarProducto('EVDAY BROWN T-SHIRT', 39.00));
    document.getElementById('btnAgregarProducto2').addEventListener('click', () => agregarProducto('GY GRAY T-SHIRT', 30.00));
    document.getElementById('btnAgregarProducto3').addEventListener('click', () => agregarProducto('WL GREEN T-SHIRT', 32.49));
    document.getElementById('btnAgregarProducto4').addEventListener('click', () => agregarProducto('GLS NAVY T-SHIRT', 39.00));
    document.getElementById('btnAgregarProducto5').addEventListener('click', () => agregarProducto('LINES BLUE & RED T-SHIRT', 45.00));
    document.getElementById('btnAgregarProducto6').addEventListener('click', () => agregarProducto('NOT IBIZA T-SHIRT', 39.00));
    document.getElementById('btnAgregarProducto7').addEventListener('click', () => agregarProducto('BASIC WHITE T-SHIRT', 42.00));
    document.getElementById('btnAgregarProducto8').addEventListener('click', () => agregarProducto('BASIC BLACK T-SHIRT', 44.00));
    document.getElementById('btnAgregarProducto9').addEventListener('click', () => agregarProducto('SCUFFERS T-SHIRT', 39.00));

    //  vaciar carrito
    document.getElementById('vaciarCarrito').addEventListener('click', function() {
        carrito = [];
        mostrarCarrito();
    });
});
