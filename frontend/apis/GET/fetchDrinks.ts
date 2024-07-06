import axios from 'axios';
import { DrinksGET } from '../types';
import { TEST_URL } from './../../URL';

const instance = axios.create();

const cache = {
  drinks: null,
  lastFetched: Number.MAX_SAFE_INTEGER,
};

let updateCacheFlag = false;

instance.interceptors.request.use(async (config) => {
  if (cache.drinks && !updateCacheFlag) {
    return Promise.reject('Using cached data');
  }
  return config;
});

instance.interceptors.response.use(response => {
  cache.drinks = response.data.drinks;
  updateCacheFlag = false; // Reset the flag after successful update
  return response;
}, error => {
  return Promise.reject(error);
});

const fetchDrinks = async (): Promise<DrinksGET[]> => {
  try {
    if (cache.drinks && !updateCacheFlag) {
      return cache.drinks;
    }
    const response = await instance.get(`${TEST_URL}/api/client/getAllDrinks`);
    cache.drinks = response.data.drinks;
    return response.data.drinks;
  } catch (error) {
    console.error('Error fetching drinks:', error);
    return cache.drinks || [];
  }
}

const updateDrinkCache = async () => {
  try {
    updateCacheFlag = true; 
    const response = await instance.get(`${TEST_URL}/api/client/getAllDrinks`);
    cache.drinks = response.data.drinks;
    return response.data.drinks;
  } catch (error) {
    console.error('Error updating cache:', error);
    return [];
  }
}

export { fetchDrinks, updateDrinkCache };
