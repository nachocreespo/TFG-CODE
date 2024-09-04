let carrito = [];

function agregarProducto(nombre, precio) {
    carrito.push({ nombre, precio });
    actualizarCarrito();

    desplegarCarrito();
}

function desplegarCarrito() {
    let carritoContenido = document.querySelector('.carrito-desplegable');
    let overlay = document.querySelector('.overlay');
    carritoContenido.classList.add('open');
    overlay.classList.add('active');
}

function actualizarCarrito() {
    let listaProductos = document.querySelector('#lista-productos');
    let totalPrecio = document.querySelector('#total');

    listaProductos.innerHTML = '';
    let total = 0;

    carrito.forEach(producto => {
        let li = document.createElement('li');
        li.textContent = `${producto.nombre} - ${producto.precio}`;
        listaProductos.appendChild(li);

        let precioProducto = parseFloat(producto.precio.replace('€', '').replace(',', '.'));
        total += precioProducto;
    });

    totalPrecio.textContent = total.toFixed(2).replace('.', ',') + '€';
}

function esCarritoVisible() {
    return document.querySelector('.carrito-desplegable').classList.contains('open');
}

document.querySelectorAll('.btnAgregarProducto').forEach(button => {
    button.addEventListener('click', function(event) {
        let nombre = this.getAttribute('data-nombre');
        let precio = this.getAttribute('data-precio');
        agregarProducto(nombre, precio);
    });
});

document.addEventListener('click', function(event) {
    let carritoContenido = document.querySelector('.carrito-desplegable');
    let overlay = document.querySelector('.overlay');
    if (esCarritoVisible() && !carritoContenido.contains(event.target) && !document.getElementById('carritoTexto').contains(event.target)) {
        carritoContenido.classList.remove('open');
        overlay.classList.remove('active');
    }
});

document.getElementById('vaciarCarrito').addEventListener('click', function() {
    carrito = []; 
    actualizarCarrito(); 
    document.querySelector('.carrito-desplegable').classList.remove('open'); 
    document.querySelector('.overlay').classList.remove('active');
});
