import axios from 'axios';
import { API_URL } from '../../constants/api';

export const flattenCartItems = (savedItems, newItems) => {
  const existingItem = savedItems?.find(
    (savedItem) => savedItem.product_id === newItems.product_id
  );

  if (existingItem) {
    existingItem.quantity += newItems.quantity;
  } else {
    savedItems?.unshift(newItems);
  }

  return savedItems;
};

export const reduceCartItems = (savedItems, newItems) => {
  const existingItem = savedItems?.find(
    (savedItem) => savedItem.product_id === newItems.product_id
  );

  if (existingItem) {
    existingItem.quantity -= 1;
  }

  return savedItems;
};

export const deleteCartItem = (array, idToRemove) => {
  return array.filter((item) => item.product_id !== idToRemove);
};

export const calculateTotalPrice = (cartsQty, productsPrices) => {
  let totalPrice = 0;

  for (let i = 0; i < cartsQty?.length; i++) {
    for (let j = 0; j < productsPrices?.length; j++) {
      if (cartsQty[i]?.product_id === productsPrices[j]?.id) {
        const quantity = cartsQty[i]?.quantity;
        const price = productsPrices[j]?.discount_price;

        totalPrice += quantity * price;
      }
    }
  }

  if (typeof totalPrice === 'number' && !Number.isInteger(totalPrice)) {
    return totalPrice.toFixed(2);
  } else if (typeof totalPrice === 'number') {
    return `${totalPrice}.00`;
  }

  // return totalPrice;
};

export const concatArrays = (arr1, arr2) => {
  const newArray = [...arr1, ...arr2];
  return newArray;
};

export const searchAction = async (item) => {
  try {
    const results = await axios.get(`${API_URL}/products/search/${item}/`);
    return results;
  } catch (err) {
    return err;
  }
};

export const getFavourite = (favourites, productSlug, userId) => {
  for (let i = 0; i < favourites?.length; i++) {
    if (favourites[i]?.product?.slug === productSlug) {
      if (favourites[i]?.user?.id === userId) return true;
    }
  }
};

export const scrollToTop = () => {
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
};
