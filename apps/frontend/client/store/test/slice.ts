import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "test",
  initialState: {
    user:null
  },
  reducers: {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    getTest() {},
    setTest(state, action) {
      console.log(action.payload);
      state.user = action.payload
    }
  }
});

export const { getTest,setTest } = userSlice.actions;

export default userSlice.reducer;
