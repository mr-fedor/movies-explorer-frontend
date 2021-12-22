import { optionsMainApi } from './utils.js';

class MainApi {
    constructor(options) {
      this._options = options;
    }
  
    _getRes(res){
      if (res.ok) {
        return res.json();
      }
  
      return Promise.reject(`Ошибка: ${res.status}`);
    }
  
    getUserInfo(){
      return fetch(`${this._options.baseUrl}/users/me`, {
        headers: this._options.headers,
      }).then(res => this._getRes(res));
    }
  
    setUserInfo(data){
      return fetch(`${this._options.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this._options.headers,
        body: JSON.stringify({
          name: data.name,
          email: data.email,
        })
      }).then(res => this._getRes(res));
    }
    
    addMovie(data){
      return fetch(`${this._options.baseUrl}/movies`, {
        method: 'POST',
        headers: this._options.headers,
        body: JSON.stringify({
          country: data.country || 'страна не указана',
          director: data.director || 'режиссер не указан',
          duration: data.duration || 'длительность не указана',
          year: data.year || 'год не указан',
          description: data.description || 'описание не указано',
          image: 'https://api.nomoreparties.co' + data.image.url || 'https://test.com/test.jpg',
          trailer: data.trailerLink || 'https://test.com/test.jpg',
          nameRU: data.nameRU || 'русскоязычное название не указано',
          nameEN: data.nameEN || 'англоязычное название не указано',
          thumbnail: 'https://api.nomoreparties.co' + data.image.url || 'https://test.com/test.jpg',
          movieId: data.id,
        })
      }).then(res => this._getRes(res));
    }

    deleteMovie(idMovie){
      return fetch(`${this._options.baseUrl}/movies/${idMovie}`, {
        method: 'DELETE',
        headers: this._options.headers,
      }).then(res => this._getRes(res));  
    }

    getSavedMovies(){
      return fetch(`${this._options.baseUrl}/movies`, {
        headers: this._options.headers,
      })
      .then(res => this._getRes(res));
    }
  }
  
  const mainApi = new MainApi(optionsMainApi);
  export default mainApi;