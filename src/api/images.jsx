import axios from "axios";

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '29231395-24a5a2bcdf0aee32dce03192b';


export const searchImages = async (query, page, perPage) => {
  const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`
  ); 
  return response.data
}

