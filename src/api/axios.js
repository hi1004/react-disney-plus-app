import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
  params: {
    api_key: '9ef95cb4c480d5a58b01781c927702d1',
    language: 'ja-JP',
  },
});
export default instance;
