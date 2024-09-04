import os
import pandas as pd
import matplotlib.pyplot as plt
from PIL import Image

#  imagen de fondo
image_width = 3068
image_height = 5280

# Rutas
file_paths = [
    r"/content/drive/MyDrive/codigo_final/layout_1/movimiento1.txt",
    r"/content/drive/MyDrive/codigo_final/layout_2/movimiento2.txt",
    r"/content/drive/MyDrive/codigo_final/layout_3/movimiento3.txt",
    r"/content/drive/MyDrive/codigo_final/layout_4/movimiento4.txt"
]

background_paths = [
    r"/content/drive/MyDrive/codigo_final/layout_1/background1.png",
    r"/content/drive/MyDrive/codigo_final/layout_2/background2.png",
    r"/content/drive/MyDrive/codigo_final/layout_3/background3.png",
    r"/content/drive/MyDrive/codigo_final/layout_4/background4.png"
]

def extract_coordinates(line):
    parts = line.split(',')
    x = int(parts[1].strip())
    y = int(parts[2].strip())
    return x, y

def generate_click_points(data, background_path, file_name):
    #  imagen de fondo y obtener tamaño
    background = Image.open(background_path)
    bg_width, bg_height = background.size

    #  factor de escala
    scale_x = bg_width / image_width
    scale_y = bg_height / image_height
    
    # Escalar las coordenadas
    data['X'] = data['X'] * scale_x
    data['Y'] = (image_height - data['Y']) * scale_y
    
    # Crear la figura 
    plt.figure(figsize=(12, 20))
    plt.imshow(background, aspect='auto', extent=[0, bg_width, bg_height, 0])
    
    # Dibujar puntos 
    plt.scatter(data['X'], data['Y'], color='yellow', s=100, alpha=0.7, marker='o')  # Puntos amarillos
    
    output_filename = f"movimiento_points_{os.path.basename(file_name)}.png"
    plt.savefig(output_filename, dpi=300)
    plt.close()

# Leer y procesar 
for i, file_path in enumerate(file_paths):
    with open(file_path, 'r') as file:
        lines = file.readlines()

    #  DataFrame 
    coordinates = [extract_coordinates(line) for line in lines]
    df = pd.DataFrame(coordinates, columns=['X', 'Y'])
    
    generate_click_points(df, background_paths[i], file_path)

print("Imágenes con puntos de movimiento amarillos generadas exitosamente.")
