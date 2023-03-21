import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

/**
 * This is where we keep all the state details for our AuthForm.
 */

const TOKEN = 'token';

/**
 * `me` is an async thunk that GETS data at /auth/me. Only tokens with valid headers be returned.
 */
export const me = createAsyncThunk('auth/me', async () => {
  const token = window.localStorage.getItem(TOKEN);
  try {
    if (token) {
      const res = await axios.get('/auth/me', {
        headers: {
          authorization: token,
        },
      });
      return res.data;
    } else {
      return {};
    }
  } catch (err) {
    if (err.response.data) {
      return thunkAPI.rejectWithValue(err.response.data);
    } else {
      return 'There was an issue with your request.';
    }
  }
});

/**
 * `authenticate` is an aysnc thunk that POSTS (creates) a JWT with a user's information, stores it in local storage, and 
 * passes the newly created token as an arguement in the `me` thunk.
 */
export const authenticate = createAsyncThunk(
  'auth/authenticate',
  async ({ username, password, method }, thunkAPI) => {
    try {
      const res = await axios.post(`/auth/${method}`, { username, password });
      window.localStorage.setItem(TOKEN, res.data.token);
      thunkAPI.dispatch(me());
    } catch (err) {
      if (err.response.data) {
        return thunkAPI.rejectWithValue(err.response.data);
      } else {
        return 'There was an issue with your request.';
      }
    }
  }
);

/**
 * `authSlice` maintains the state of AuthForm.
 */
export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    me: {},
    error: null,
  },
  //On log out, remove JWT from local storage.
  reducers: {
    logout(state, action) {
      window.localStorage.removeItem(TOKEN);
      state.me = {};
      state.error = null;
    },
  },
  //Beacuse our thunks are async, their reducers are extraReducers.
  extraReducers: (builder) => {
    builder.addCase(me.fulfilled, (state, action) => {
      state.me = action.payload;
    });
    builder.addCase(me.rejected, (state, action) => {
      state.error = action.error;
    });
    builder.addCase(authenticate.rejected, (state, action) => {
      state.error = action.payload;
    });
  },
});

/*
  ACTIONS
*/
export const { logout } = authSlice.actions;
export const selectUserObject = (state) => {
  return state.auth.me;
}

/*
  REDUCER
*/
export default authSlice.reducer;
