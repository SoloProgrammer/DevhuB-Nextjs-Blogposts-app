import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authSlice";
import commentsReducer from "@/redux/slices/commentsSlice";
import categoriesReducer from "@/redux/slices/categoriesSlice";
import profileUserReducer from "./slices/profileUserSlice";
import { postsApi } from "./api/postsApi";
import { commentsApi } from "./api/commentsApi";

const store = configureStore({
  reducer: {
    auth: authReducer,
    comments: commentsReducer,
    categories: categoriesReducer,
    profile: profileUserReducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
  },
  middleware: (mid) =>
    mid().concat(postsApi.middleware, commentsApi.middleware),
});
export default store;
