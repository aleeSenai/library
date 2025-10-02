import axios from 'axios';

const api = axios.create({
  // A URL base do seu backend.
  // Se o seu backend estiver a correr noutra porta, altere aqui.
  baseURL: 'http://localhost:8080'
});

export default api;