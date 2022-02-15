import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
  user: null,
  isSignIn: false,
  isSingUp: false,
};

export const postSignIn = createAsyncThunk(
  "auth/postSignIn",
  async ({ userId, password }: { userId: string; password: string }) => {
    try {
      console.log(userId, password);

      return null;
    } catch (error) {
      console.error(error);
    }
  }
);

export const postSignUp = createAsyncThunk(
  "auth/postSignUp",
  async ({ userId, password }: { userId: string; password: string }) => {
    try {
      console.log(userId, password);

      return null;
    } catch (error) {
      console.error(error);
    }
  }
);

export const authSlice = createSlice({
  name: "authSlice",
  initialState: initialAuthState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(postSignIn.fulfilled, (state, action) => {
        if (!action.payload) return;

        state.isSignIn = true;
      })
      .addCase(postSignUp.fulfilled, (state, action) => {
        if (!action.payload) return;

        state.isSingUp = true;
      }),
});
