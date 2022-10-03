import axios from 'axios';

const createPromotionService = axios.create({
  baseURL: `http://jsonplaceholder.typicode.com/`
});

const updatePromotionService = axios.create({
    baseURL: `http://jsonplaceholder.typicode.com/`
});

const deletePromotionService = axios.create({
    baseURL: `http://jsonplaceholder.typicode.com/`
});