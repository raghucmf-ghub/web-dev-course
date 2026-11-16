import { fallbackProducts } from '../assets/fallbackProducts';

const API_URL = 'https://fakestoreapi.com/products';

export const fetchAllProducts = async () => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch from API');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('Using fallback static products due to network/API error:', error);
    return fallbackProducts;
  }
};
