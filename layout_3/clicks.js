document.addEventListener('click', function(event) {
    // Obtener las coordenadas X e Y del clic
    var x = event.pageX - document.body.getBoundingClientRect().left;
    var y = event.pageY - document.body.getBoundingClientRect().top;
    

    // Enviar las coordenadas al servidor
    fetch('guardar_clicks.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `x=${x}&y=${y}`
    })
    .then(response => response.text())
    .then(data => {
        console.log('Respuesta del servidor: ' + data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
});