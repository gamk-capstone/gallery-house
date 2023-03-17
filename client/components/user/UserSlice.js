import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


//Get user saved wall
export const fetchUserWallsAsync = createAsyncThunk("fetchUserWalls", async () => {
  try {
    const { data } = await axios.get(`/api/user/:id/galleries/${id}`);
    return data;
  } catch (err) {
    next(err);
  }
});

export const userWallsSlice = createSlice({
  name: "userWalls",
  initialState: [],
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserWallsAsync.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectUserWalls = (state) => {
  return state.userWalls;
};


export default userWallsSlice.reducer;