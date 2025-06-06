import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import Api from "@/api";


export interface User {
  id: string;
  fullName: string;
  userName:string;
  email: string;
  isEmailVerified: boolean;
  avatar: {
    public_id: string;
    url: string;
    _id: string;
  };
  createdAt:Date
}

interface AuthSliceState {
  loader: boolean;
  user: User | null;
}

const initialState: AuthSliceState = {
  loader: true,
  user: null,
};

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async () => {
    const response = await Api.get(`/auth/getUserData`, {
      withCredentials: true,
      timeout:3000,
    },);
    return response.data.data;
  }
);

 export const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    setUserData: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.loader = false;
    },
    removeUserData: (state) => {
      state.user = null;
      state.loader = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserData.pending, (state) => {
        state.loader = true; // Data is being fetched
      })
      .addCase(fetchUserData.fulfilled, (state, action) => {
        state.user = action.payload; // Set user data
        state.loader = false; // Data fetching is complete
      })
      .addCase(fetchUserData.rejected, (state) => {
        state.loader = false; // Data fetching failed
        state.user = null;    // Clear user data
      });
  },
});

export const {setUserData,removeUserData} =authSlice.actions