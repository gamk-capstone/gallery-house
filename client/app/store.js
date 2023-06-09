import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

//Imported reducers
import authReducer from '../components/auth/authSlice';
import allUsersArtSlice from '../components/userArt/allUsersArtSlice';
import singleUserArtSlice from '../components/userArt/SingleUserArtSlice';
import galleryWallSlice from "../components/galleryWall/galleryWallSlice";
import savedWallsSlice from "../components/savedWalls/savedWallsSlice"
import savedWallSlice from "../components/savedWall/savedWallSlice"
import savedEtsyArtSlice from '../components/savedEtsyArt/savedEtsyArtSlice';

// This is where we configure our store. We keep our slice reducers here, and passed them down to every part of our app as global state.
const store = configureStore({
  reducer: { 
    auth: authReducer,
    usersArt: allUsersArtSlice,
    singleUserArt: singleUserArtSlice,
    galleryWall: galleryWallSlice,
    savedWalls: savedWallsSlice,
    savedWall: savedWallSlice,
    savedEtsyArt: savedEtsyArtSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
export * from '../components/auth/authSlice';
