import { configureStore } from '@reduxjs/toolkit';
import productReducer from '../redux/slices/productSlice';
import appReducer from '../redux/slices/appSlice';
import basketSlice from '../redux/slices/basketSlice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    product: productReducer,
    basket: basketSlice
  },
});
