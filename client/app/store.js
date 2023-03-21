import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../components/auth/authSlice';
import UserArtSlice from '../components/userArt/UserArtSlice';
import SingleUserArtSlice from '../components/userArt/SingleUserArtSlice';
import userWallsSlice from '../components/user/userWallsSlice';

// This is where we configure our store. We keep our slice reducers here, and passed them down to every part of our app as global state.
const store = configureStore({
  reducer: { 
    auth: authReducer,
    userArt:UserArtSlice,
    singleUserArt: SingleUserArtSlice,
    userWalls: userWallsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../components/auth/authSlice';
