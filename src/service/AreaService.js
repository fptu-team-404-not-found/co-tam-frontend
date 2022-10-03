import axios from 'axios';

const createAreaService = axios.create({
  baseURL: `http://jsonplaceholder.typicode.com/`
});

const updateAreaService = axios.create({
    baseURL: `http://jsonplaceholder.typicode.com/`
});

const deleteAreaService = axios.create({
    baseURL: `http://jsonplaceholder.typicode.com/`
});