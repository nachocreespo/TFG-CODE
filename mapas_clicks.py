import os
import pandas as pd
import matplotlib.pyplot as plt
from PIL import Image

# Tamaño original 
image_width = 3068
image_height = 5280

# Rutas 
file_paths = [
    r"/content/drive/MyDrive/codigo_final/layout_1/clicks1.txt",
    r"/content/drive/MyDrive/codigo_final/layout_2/clicks2.txt",
    r"/content/drive/MyDrive/codigo_final/layout_3/clicks3.txt",
    r"/content/drive/MyDrive/codigo_final/layout_4/clicks4.txt"
]

background_paths = [
    r"/content/drive/MyDrive/codigo_final/layout_1/background1.png",
    r"/content/drive/MyDrive/codigo_final/layout_2/background2.png",
    r"/content/drive/MyDrive/codigo_final/layout_3/background3.png",
    r"/content/drive/MyDrive/codigo_final/layout_4/background4.png"
]

def clean_coordinates(value):
    return int(value.split(":")[1].strip())

def generate_click_points(data, background_path, file_name):
    #  obtener su tamaño
    background = Image.open(background_path)
    bg_width, bg_height = background.size

    # factor de escala
    scale_x = bg_width / image_width
    scale_y = bg_height / image_height
    
    # Escalar  coordenadas
    data['X'] = data['X'] * scale_x
    data['Y'] = (image_height - data['Y']) * scale_y
    
    # Crear  figura y superponer  puntos 
    plt.figure(figsize=(12, 20))
    plt.imshow(background, aspect='auto', extent=[0, bg_width, bg_height, 0])
    
    # Dibujar 
    plt.scatter(data['X'], data['Y'], color='yellow', s=100, alpha=0.7, marker='o')  #  amarillos
    
    # Guardar 
    output_filename = f"click_points_{os.path.basename(file_name)}.png"
    plt.savefig(output_filename, dpi=300)
    plt.close()

# Leer y procesar archivos
for i, file_path in enumerate(file_paths):
    df = pd.read_csv(file_path, sep=",", header=None)
    df.columns = ['X', 'Y']
    
    # Limpiar las columnas
    df['X'] = df['X'].apply(clean_coordinates)
    df['Y'] = df['Y'].apply(clean_coordinates)
    
    generate_click_points(df, background_paths[i], file_path)

print("Imágenes con puntos de clic generadas exitosamente.")
