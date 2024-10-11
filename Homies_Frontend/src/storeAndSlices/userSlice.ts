import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userData: null,
  token: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    auth: (state, action) => {
      state.isAuthenticated = action.payload;
    },

    accessToken: (state, action) => {
      state.token = action.payload;
    },

    setUser: (state, action) => {
      state.userData = action.payload;
    },

    logout: (state) => {
      state.token = null;
      state.userData = null;
      state.isAuthenticated = false;
    },
  },
});

export const { auth, accessToken, setUser, logout } = userSlice.actions;
export default userSlice.reducer;
