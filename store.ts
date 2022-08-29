import { configureStore } from "@reduxjs/toolkit";

import counterSlice from "./app/slices/counterSlice";
import taskSlice from "./app/slices/taskSlice";
import userSlice from "./app/slices/userSlice";

export const store = configureStore({
  reducer: {
    counter: counterSlice,
    user: userSlice,
    task: taskSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
