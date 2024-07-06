import axios from 'axios';
import { Dish } from '../types';
import { TEST_URL } from './../../URL';

const instance = axios.create();

const cache = {
  dishes: null,
  lastFetched: Number.MAX_SAFE_INTEGER,
};

let updateCacheFlag = false;

instance.interceptors.request.use(async (config) => {
  if (cache.dishes && !updateCacheFlag) {
    return Promise.reject('Using cached data');
  }
  return config;
});

instance.interceptors.response.use(response => {
  cache.dishes = response.data.dishes;
  updateCacheFlag = false; // Reset the flag after successful update
  return response;
}, error => {
  return Promise.reject(error);
});

const fetchDishes = async (): Promise<Dish[]> => {
  try {
    if (cache.dishes && !updateCacheFlag) {
      return cache.dishes;
    }
    const response = await instance.get(`${TEST_URL}/api/client/getAllDishes`);
    cache.dishes = response.data.dishes;
    return response.data.dishes;
  } catch (error) {
    console.error('Error fetching menu:', error);
    return cache.dishes || [];
  }
}

const updateDishCache = async () => {
  try {
    updateCacheFlag = true; 
    await fetchDishes(); 
  } catch (error) {
    console.error('Error updating dish cache:', error);
    throw error;
  }
}

export { fetchDishes, updateDishCache };
