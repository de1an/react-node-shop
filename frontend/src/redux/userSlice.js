import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: {}
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    deleteUser: (state) => {
      state.user = {};
    }
  }
})

export const { setUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;