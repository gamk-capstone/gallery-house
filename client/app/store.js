import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../components/auth/authSlice';
import artReducer from "../../script/art/artSlice"

const store = configureStore({
  reducer: { 
    auth: authReducer,
<<<<<<< HEAD
    art: artReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../components/auth/authSlice';
