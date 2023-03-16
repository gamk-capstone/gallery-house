import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../components/auth/authSlice';
<<<<<<< HEAD
import artReducer from "../../script/art/artSlice"
=======
import UserArtSlice from '../components/userArt/UserArtSlice';
import SingleUserArtSlice from '../components/userArt/SingleUserArtSlice';
>>>>>>> 6f9abd2b12e1ae150ab4cb51798717f888ea4d81

const store = configureStore({
  reducer: { 
    auth: authReducer,
<<<<<<< HEAD
    art: artReducer,
=======
    userArt:UserArtSlice,
    singleUserArt: SingleUserArtSlice
>>>>>>> 6f9abd2b12e1ae150ab4cb51798717f888ea4d81
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../components/auth/authSlice';
