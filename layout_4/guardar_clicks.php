<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['x']) && isset($_POST['y'])) {
    // Coordenadas
    $x = intval($_POST['x']);
    $y = intval($_POST['y']);

    $file = 'clicks4.txt';
    $data = "X: $x, Y: $y" . PHP_EOL;

    // Archivo
    file_put_contents($file, $data, FILE_APPEND);

    // Respuesta cliente
    echo "Coordenadas guardadas: X = $x, Y = $y";
} else {
    echo "No se recibieron coordenadas.";
}
?>
