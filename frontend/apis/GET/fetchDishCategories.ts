import axios from 'axios';
import { TEST_URL } from './../../URL';

const instance = axios.create();

const cache = {
  categories: null,
  lastFetched: Number.MAX_SAFE_INTEGER,
};

let updateCacheFlag = false;

instance.interceptors.request.use(async (config) => {
  if (cache.categories && !updateCacheFlag) {
    return Promise.reject('Using cached data');
  }
  return config;
});

instance.interceptors.response.use(response => {
  cache.categories = response.data.category_d;
  updateCacheFlag = false; // Reset the flag after successful update
  return response;
}, error => {
  return Promise.reject(error);
});

const fetchDishCategories = async (): Promise<any> => {
  try {
    if (cache.categories && !updateCacheFlag) {
      return cache.categories;
    }
    const response = await instance.get(`${TEST_URL}/api/client/getAllDishesCategories`);
    cache.categories = response.data.category_d;
    return response.data.category_d;
  } catch (error) {
    console.error('Error fetching dish categories:', error);
    return cache.categories || [];
  }
}

const updateDishCategoryCache = async () => {
  try {
    updateCacheFlag = true; // Set the flag to indicate an update is needed
    const response = await instance.get(`${TEST_URL}/api/client/getAllDishesCategories`);
    cache.categories = response.data.category_d;
    return response.data.category_d;
  } catch (error) {
    console.error('Error updating dish category cache:', error);
    return [];
  }
}

export { fetchDishCategories, updateDishCategoryCache };
