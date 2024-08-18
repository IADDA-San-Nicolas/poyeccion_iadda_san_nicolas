// Función para generar la URL para buscar canciones en Firebase
function createUrlToSearch(input) {
  // Retorna la URL base para realizar la búsqueda en Firebase
  return 'https://canciones-iadda-default-rtdb.firebaseio.com/.json';
}

// Función para analizar la respuesta de la búsqueda y convertirla en una lista de canciones
function parseSearchResponseToList(response) {
  var songs = [];
  
  // Verifica si la respuesta es un string JSON o un objeto y lo convierte en objeto JSON si es necesario
  var json = typeof response === 'string' ? JSON.parse(response) : response;
  
  // Itera sobre cada clave en el objeto JSON
  for (var key in json) {
    if (json.hasOwnProperty(key)) {
      var song = json[key];
      
      // Añade cada canción a la lista de resultados con su ID, título, y autor/artista
      songs.push({
        'id': song.id, // Usa el ID numérico como identificador
        'title': song.title || 'Título desconocido', // Si no hay título, asigna 'Título desconocido'
        'artist_or_author': song.author || 'Desconocido' // Usa el campo 'author' como 'artist_or_author', o 'Desconocido' si no está presente
      });
    }
  }

  return songs; // Retorna la lista de canciones
}

// Función para generar la URL para obtener una canción específica por su ID desde Firebase
function createUrlToGetById(id) {
  // Retorna la URL específica para obtener una canción por su ID numérico
  return 'https://canciones-iadda-default-rtdb.firebaseio.com/' + encodeURI(id) + '.json';
}

// Función para analizar la respuesta de obtener una canción específica y convertirla en un objeto canción
function parseGetResponseToSong(response) {
  // Verifica si la respuesta es un string JSON o un objeto y lo convierte en objeto JSON si es necesario
  var json = typeof response === 'string' ? JSON.parse(response) : response;
  
  // Retorna un objeto con los detalles de la canción, utilizando valores por defecto si faltan datos
  return {
    'title': json.title || 'Título desconocido', // Usa 'Título desconocido' si el título no está presente
    'artist': json.artist || 'Desconocido', // Usa 'Desconocido' si el campo 'artist' no está presente
    'author': json.author || 'Desconocido', // Usa 'Desconocido' si el campo 'author' no está presente
    'lyrics': json.lyrics || 'Letra no disponible' // Usa 'Letra no disponible' si no hay letra en la respuesta
  };
}

// Ejemplo de uso
var response = {
    "title": "Ejemplo de canción",
    "artist": "Autor Desconocido",
    "author": "Autor Desconocido",
    "lyrics": "Esta es la letra de la canción."
};

var song = parseGetResponseToSong(response);
// Eliminar console.log y manejar la información en tu aplicación como necesites
