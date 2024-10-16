import { createSlice } from "@reduxjs/toolkit";

export interface IUserData {
  userData?: {
    _id: string | null;
    name: string | null;
    userName: string | null;
    email: string | null;
    profileImg: string | null;
    followers: string | null;
    following: string | null;
  };
  token?: string | null;
  isAuthenticated?: boolean;
}

const initialState: IUserData = {
  userData: {
    _id: null,
    name: null,
    userName: null,
    email: null,
    profileImg: null,
    followers: null,
    following: null,
  },
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
      state.token = initialState.token;
      state.userData = initialState.userData;
      state.isAuthenticated = initialState.isAuthenticated;
    },
  },
});

export const { auth, accessToken, setUser, logout } = userSlice.actions;
export default userSlice.reducer;
