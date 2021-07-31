import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user:null
  },
  reducers: {
    getUser() {},
    setUser(state, action) {
      console.log(action.payload);
      state.user = action.payload
    }
  }
});

export const { getUser, setUser } = userSlice.actions;

export default userSlice.reducer;
