// export const BASE_URL = "https://blinov-api.nomoredomains.work/api";
export const BASE_URL = "http://localhost:3001/api";

function _getRes(res){
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = (password, email, name) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({password, email, name})
    })
    .then((res) => _getRes(res))
};

export const authorize = (password, email) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({password, email})
        })
        .then((res) => _getRes(res))
        .then((data) => {
            if (data.token){
                localStorage.setItem('jwt', data.token);
                return data;
            } else {
                return;
            }
        });
};

export const getUser = (jwt) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwt}`,
        },
        credentials: 'include'
      })
      .then((res) => _getRes(res))
      .then(data => data);
};