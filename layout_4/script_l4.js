document.addEventListener('DOMContentLoaded', () => {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    const carritoDesplegable = document.getElementById('carritoDesplegable');
    const listaProductos = document.getElementById('lista-productos');
    const totalElement = document.getElementById('total');
    const finalizarCompraButton = document.getElementById('finalizarCompra');

    let carrito = [];
    let total = 0;

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const productElement = event.target.closest('.product');
            const productName = productElement.querySelector('.product-name').textContent;
            const productPrice = parseFloat(productElement.querySelector('.product-price').textContent.replace('€', ''));

            carrito.push({ name: productName, price: productPrice });
            total += productPrice;
            updateCarrito();
        });
    });

    function updateCarrito() {
        listaProductos.innerHTML = '';
        carrito.forEach(product => {
            const li = document.createElement('li');
            li.textContent = `${product.name} - €${product.price.toFixed(2)}`;
            listaProductos.appendChild(li);
        });

        totalElement.textContent = total.toFixed(2);
        carritoDesplegable.classList.add('open');
    }

    finalizarCompraButton.addEventListener('click', () => {
        alert('Compra finalizada. Total: €' + total.toFixed(2));
        carrito = [];
        total = 0;
        updateCarrito();
        carritoDesplegable.classList.remove('open');
    });

    // Cerrar el carrito al hacer clic fuera de él
    document.addEventListener('click', (event) => {
        if (!carritoDesplegable.contains(event.target) && !event.target.classList.contains('add-to-cart')) {
            carritoDesplegable.classList.remove('open');
        }
    });
});
