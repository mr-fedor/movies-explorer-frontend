import {optionsMoviesApi} from './utils.js';

class MoviesApi{
    constructor(options) {
        this._options = options;
    }

    getFilms() {
        return fetch(`${this._options.baseUrl}`, {
          headers: this._options.headers
        })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
    
            return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
}

const moviesApi = new MoviesApi(optionsMoviesApi);
export default moviesApi;