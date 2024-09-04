document.addEventListener("DOMContentLoaded", function() {
    var mouseCoordinates = [];
    var lastTimestamp = 0; 

    // rastrear movimiento del ratón
    function trackMouseMovement(event) {
        var timestamp = Math.floor(Date.now() / 1000); // Timest
        var coordinates = {
            x: event.clientX,
            y: event.clientY,
            timestamp: timestamp
        };

        //  timestamp actual es diferente 
        if (timestamp !== lastTimestamp) {
            mouseCoordinates.push(coordinates);
            lastTimestamp = timestamp; 
        }
    }

    // Envío coordenadas 
    function sendMouseCoordinates() {
        if (mouseCoordinates.length > 0) {
            var xhr = new XMLHttpRequest();
            xhr.open("POST", "guardar_movimiento.php", true);
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(mouseCoordinates));
            mouseCoordinates = []; 
        }
    }

    // Rastreo movimiento 
    document.addEventListener("mousemove", trackMouseMovement);

    setInterval(sendMouseCoordinates, 1000);
});
