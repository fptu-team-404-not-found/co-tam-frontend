import axios from 'axios';

const createAccount = axios.create({
  baseURL: `http://jsonplaceholder.typicode.com/`
});