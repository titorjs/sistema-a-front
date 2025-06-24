import axios from 'axios';

const apiProveedores = axios.create({
  baseURL: 'http://localhost:8000', // cambia si el otro API está en otro host o puerto
});

export default apiProveedores;
