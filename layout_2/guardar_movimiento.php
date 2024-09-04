<?php
// Leer 
$data = file_get_contents("php://input");
$coordinates = json_decode($data, true);

// Ordenar 
usort($coordinates, function($a, $b) {
    return $a['timestamp'] - $b['timestamp'];
});

// Abrir archivo  
$logFilePath = "movimiento2.txt";
$fileHandle = fopen($logFilePath, "a");
if (!$fileHandle) {
    die("Error al abrir el archivo!");
}

// Escribir  coordenadas 
foreach ($coordinates as $coord) {
    $formattedCoord = "Coordenadas (" . date("Y-m-d H:i:s", $coord['timestamp']) . "), " . $coord['x'] . ", " . $coord['y'] . "\n";
    fwrite($fileHandle, $formattedCoord);
}

fclose($fileHandle);
?>
