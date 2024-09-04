let carrito = [];

// agregar un producto al carrito
function agregarProducto(nombre, precio) {
    
    let productoExistente = carrito.find(producto => producto.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        let producto = {
            nombre: nombre,
            precio: precio,
            cantidad: 1
        };
        carrito.push(producto);
    }
    
    mostrarCarrito();
}

//  mostrar el contenido del carrito
function mostrarCarrito() {
    let carritoContenido = document.getElementById('carrito-contenido');
    let listaProductos = document.getElementById('lista-productos');
    let totalPrecio = document.getElementById('total');


    listaProductos.innerHTML = '';
    carrito.forEach(producto => {
        let li = document.createElement('li');
        li.textContent = `${producto.nombre} x${producto.cantidad} - €${(producto.precio * producto.cantidad).toFixed(2)}`;
        listaProductos.appendChild(li);
    });


    let total = calcularTotal();
    totalPrecio.textContent = total.toFixed(2);
    

    carritoContenido.style.display = 'block';
}


function calcularTotal() {
    let total = 0;
    carrito.forEach(producto => {
        total += producto.precio * producto.cantidad;
    });
    return total;
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('btnAgregarProducto1').addEventListener('click', () => agregarProducto('GLS NAVY T-SHIRT', 39.00));
    document.getElementById('btnAgregarProducto2').addEventListener('click', () => agregarProducto('SEAS WHITE T-SHIRT', 39.00));
    document.getElementById('btnAgregarProducto3').addEventListener('click', () => agregarProducto('NOT IBIZA T-SHIRT', 39.00));
    document.getElementById('btnAgregarProducto4').addEventListener('click', () => agregarProducto('MERCHAN T-SHIRT', 39.00));
    document.getElementById('btnAgregarProducto5').addEventListener('click', () => agregarProducto('ICONIC WHITE T-SHIRT', 39.00));
    document.getElementById('btnAgregarProducto6').addEventListener('click', () => agregarProducto('ASH T-SHIRT', 27.30));


    document.getElementById('btnCarrito').addEventListener('click', function() {
        let carritoContenido = document.getElementById('carrito-contenido');
        if (carritoContenido.style.display === 'block' || carritoContenido.style.display === '') {
            carritoContenido.style.display = 'none';
        } else {
            carritoContenido.style.display = 'block';
        }
    });

    document.getElementById('checkout').addEventListener('click', function() {
        alert('Compra finalizada. Gracias por su compra!');
        carrito = [];
        mostrarCarrito();
    });    

});
