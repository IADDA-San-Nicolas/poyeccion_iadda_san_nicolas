import json

def convert_cancionero_to_json(input_md_path, output_json_path):
    # Leer el archivo markdown
    with open(input_md_path, 'r', encoding='utf-8') as file:
        lines = file.readlines()

    # Inicializar la lista de canciones
    songs = []
    song_id = 0
    in_song = False
    current_song = {}
    lyrics_accumulator = []

    # Bandera para saber si hemos pasado el índice
    after_index = False

    # Procesar cada línea del archivo
    for line in lines:
        if after_index:
            if line.startswith('## '):
                if in_song:
                    # Guardar la canción anterior
                    current_song['lyrics'] = '\n'.join(lyrics_accumulator)
                    songs.append(current_song)
                    lyrics_accumulator = []

                # Inicializar una nueva canción
                title = line[3:].strip()  # Extraer el título después de '##'
                current_song = {
                    "id": song_id,
                    "title": title,
                    "classification": "",
                    "author": "",
                    "lyrics": ""
                }
                song_id += 1
                in_song = True
            elif in_song:
                # Acumular las líneas de la canción
                lyrics_accumulator.append(line.strip())
        elif line.startswith('## '):
            # Saltar el índice, la primera canción empieza después de este punto
            after_index = True

    # Guardar la última canción procesada
    if in_song:
        current_song['lyrics'] = '\n'.join(lyrics_accumulator)
        songs.append(current_song)

    # Convertir la lista de canciones a formato JSON y guardarla
    with open(output_json_path, 'w', encoding='utf-8') as json_file:
        json.dump(songs, json_file, ensure_ascii=False, indent=4)

# Ejemplo de uso:
input_md_path = 'ruta/al/archivo/cancionero.md'
output_json_path = 'ruta/al/archivo/cancionero.json'
convert_cancionero_to_json(input_md_path, output_json_path)
