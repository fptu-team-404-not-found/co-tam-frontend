import axios from 'axios';

const createBuildingService = axios.create({
  baseURL: `http://jsonplaceholder.typicode.com/`
});

const updateBuildingService = axios.create({
    baseURL: `http://jsonplaceholder.typicode.com/`
});

const deleteBuildingService = axios.create({
    baseURL: `http://jsonplaceholder.typicode.com/`
});