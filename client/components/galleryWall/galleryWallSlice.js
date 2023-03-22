import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateEmptyFrameCount = createAsyncThunk("updateEmptyFrameCount", async (count) => {
  try {
    const { data } = await axios.put(`/api/`)
  }
})