import axios from 'axios';
import { DrinksCategory } from '../types';
import { TEST_URL } from '../../URL';

const instance = axios.create();

const cache = {
  drinkCategories: null,
  lastFetched: Number.MAX_SAFE_INTEGER,
};

let updateCacheFlag = false;

instance.interceptors.request.use(async (config) => {
  if (cache.drinkCategories && !updateCacheFlag) {
    return Promise.reject('Using cached data');
  }
  return config;
});

instance.interceptors.response.use(response => {
  cache.drinkCategories = response.data.category_d;
  updateCacheFlag = false; // Reset the flag after successful update
  return response;
}, error => {
  return Promise.reject(error);
});

const fetchDrinkCategory = async (): Promise<DrinksCategory[]> => {
  try {
    if (cache.drinkCategories && !updateCacheFlag) {
      return cache.drinkCategories;
    }
    const response = await instance.get(`${TEST_URL}/api/client/getAllDrinksCategories`);
    cache.drinkCategories = response.data.category_d;
    return response.data.category_d;
  } catch (error) {
    console.error('Error fetching drink category:', error);
    return cache.drinkCategories || [];
  }
}

const updateDrinkCategoryCache = async () => {
  try {
    updateCacheFlag = true; // Set the flag to indicate an update is needed
    const response = await instance.get(`${TEST_URL}/api/client/getAllDrinksCategories`);
    cache.drinkCategories = response.data.category_d;
    return response.data.category_d;
  } catch (error) {
    console.error('Error updating drink category cache:', error);
    return [];
  }
}

export { fetchDrinkCategory, updateDrinkCategoryCache };
