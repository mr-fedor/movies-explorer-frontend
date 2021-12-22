export const optionsMoviesApi = {
    baseUrl: 'https://api.nomoreparties.co/beatfilm-movies',
    headers: {
        'Content-Type': 'application/json'
    }
};

export const optionsMainApi = {
    baseUrl: 'https://blinov-api.nomoredomains.work/api',
    headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        'Content-Type': 'application/json'
    }
}