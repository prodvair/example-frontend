import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../store";

export interface userState {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

const initialState: userState = {
  id: "",
  title: "",
  content: "",
  created_at: "",
  updated_at: "",
};

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    getTask: (state) => {
      state.id = "1";
      state.title = "1";
      state.content = "2";
      state.created_at = "3";
      state.updated_at = "4";
    },
  },
});

// Action creators are generated for each case reducer function
export const { getTask } = taskSlice.actions;

export const selectTask = (state: RootState) => state.task;

export default taskSlice.reducer;
