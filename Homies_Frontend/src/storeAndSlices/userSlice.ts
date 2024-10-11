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
    login: (state, action: PayloadAction<Partial<UserData>>) => {
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

      if (token !== undefined) state.token = token || state.token;
      if (_id !== undefined) state._id = _id || state._id;
      if (name !== undefined) state.name = name || state.name;
      if (userName !== undefined) state.userName = userName || state.userName;
      if (email !== undefined) state.email = email || state.email;
      if (profileImg !== undefined)
        state.profileImg = profileImg || state.profileImg;
      if (followers !== undefined)
        state.followers = followers || state.followers;
      if (following !== undefined)
        state.following = following || state.following;
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
