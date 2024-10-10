import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  token?: string | null;
  _id?: string | null;
  name: string | null;
  userName: string | null;
  email: string | null;
  profileImg: string | null;
  followers?: string[] | null;
  following?: string[] | null;
  isAuthenticated?: boolean;
}

const initialState: UserData = {
  token: null,
  _id: null,
  name: null,
  userName: null,
  email: null,
  profileImg: null,
  followers: null,
  following: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserData>) => {
      const {
        token,
        _id,
        name,
        userName,
        email,
        profileImg,
        followers,
        following,
        isAuthenticated,
      } = action.payload;

      state.token = token;
      state._id = _id;
      state.name = name;
      state.userName = userName;
      state.email = email;
      state.profileImg = profileImg;
      state.followers = followers;
      state.following = following;
      state.isAuthenticated = isAuthenticated ?? true;
    },

    logout: (state) => {
      state.token = null;
      state._id = null;
      state.name = null;
      state.userName = null;
      state.email = null;
      state.profileImg = null;
      state.followers = null;
      state.following = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
