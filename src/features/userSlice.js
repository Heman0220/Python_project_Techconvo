import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    userInfo: null
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    userData: (state,action) => {
      state.userInfo = action.payload
    }
  },
});

export const { login,logout,userData } = userSlice.actions;
export const selectUser = state => state.user.user;
export const selectUserInfo = state => state.user.userInfo;

export default userSlice.reducer;
