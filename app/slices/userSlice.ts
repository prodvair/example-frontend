import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../store";

export interface userState {
  is_auth: boolean;
  first_name: string;
  last_name: string;
  email: string;
  birthday: string;
  avatar: string;
}

const initialState: userState = {
  is_auth: false,
  first_name: "",
  last_name: "",
  email: "",
  birthday: "",
  avatar: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUser: (state) => {
      state.is_auth = true;
      state.first_name = "1";
      state.last_name = "2";
      state.email = "3";
      state.birthday = "4";
      state.avatar = "5";
    },
  },
});

// Action creators are generated for each case reducer function
export const { getUser } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
