import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../components/auth/authSlice';
import artReducer from "../../script/art/estyArtSlice"

const store = configureStore({
  reducer: { 
    auth: authReducer,
    art: artReducer,
    // userArt:UserArtSlice,
    // singleUserArt: SingleUserArtSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../components/auth/authSlice';
