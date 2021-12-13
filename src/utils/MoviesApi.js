import {optionsMoviesApi} from './utils.js';

class MoviesApi{
    constructor(options) {
        this._options = options;
    }

    _getRes(res){
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Ошибка: ${res.status}`);
    }

    getFilms() {
        return fetch(`${this._options.baseUrl}`, {
          headers: this._options.headers
        })
        .then(res => this._getRes(res));
    }
}

const moviesApi = new MoviesApi(optionsMoviesApi);
export default moviesApi;