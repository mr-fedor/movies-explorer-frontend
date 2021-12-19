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
  
  }
  
  const mainApi = new MainApi(optionsMainApi);
  export default mainApi;