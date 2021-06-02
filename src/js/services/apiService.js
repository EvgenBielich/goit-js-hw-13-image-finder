import axios from 'axios';
axios.defaults.baseURL = 'https://pixabay.com/api/';
const API_KEY = '21861967-58779b127d1d49516db5a12e4';

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages () {
    
  const url = `?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=20&key=${API_KEY}`;

    return axios
      .get(url)
      .then(response => {
        this.incrementPage();
        return response.data.hits;
      })
      .catch(error => console.log(error));
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get query(){
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}