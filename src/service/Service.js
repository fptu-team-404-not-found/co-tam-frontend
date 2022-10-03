import axios from 'axios';

const createService = axios.create({
  baseURL: `http://jsonplaceholder.typicode.com/`
});

const updateService = axios.create({
    baseURL: `http://jsonplaceholder.typicode.com/`
});

const deleteService = axios.create({
    baseURL: `http://jsonplaceholder.typicode.com/`
});