function createUrlToSearch(input) {
  //input.text (string)
  //input.title (boolean)
  //input.artist (boolean)
  //input.lyrics (boolean)
  //return 'https://domain.com/search'
  //  + '?text=' + encodeURI(input.text);
  return null;
}

function parseSearchResponseToList(response) {
  var json = JSON.parse(response);
  var songs = [];
  for (var i = 0; i < json.length; i++) {
    songs.push({
      'id': json[i]['id'],
      'title': json[i]['title'],
      'artist_or_author': json[i]['author']
    });
  }
  return songs;
}

function createUrlToGetById(id) {
  //return 'https://domain.com/get'
  //  + '?id=' + encodeURI(id);
  return null;
}

function parseGetResponseToSong(response) {
  var json = JSON.parse(response);
  return {
    'title': json['title'],
    'artist': json['artist'],
    'author': json['author'],
    'lyrics': json['lyrics']
  };
}
