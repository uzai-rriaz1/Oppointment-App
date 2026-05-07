import { createSlice } from "@reduxjs/toolkit";
import { Cookie } from "lucide-react";

const userSlice = createSlice({
  name: "user",
  initialState: { user: null },
  reducers: {
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state, action) => {
      state.user = null;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { loginUser, logoutUser, setUser } = userSlice.actions;
export default userSlice.reducer;
