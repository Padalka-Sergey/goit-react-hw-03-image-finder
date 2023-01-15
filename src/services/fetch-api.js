// import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = 'key=31316386-df3d7a07dab36b9800dfb8d2b';
const PROP = '&image_type=photo&orientation=horizontal';
const PER_PAGE = '&per_page=12';

function fetchApi(text, page) {
  return fetch(
    `${BASE_URL}?q=${text}&page=${page}&${KEY}${PROP}${PER_PAGE}`
  ).then(res => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(new Error(`Картинки с именем ${text} нет :(`));
  });
}

const api = {
  fetchApi,
};

export default api;
