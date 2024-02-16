import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authSlice";
import commentsReducer from "@/redux/slices/commentsSlice";
import categoriesReducer from "@/redux/slices/categoriesSlice";
import tagsReducer from "@/redux/slices/tagsSlice";
import postReducer from "@/redux/slices/postSlice";
import profileUserReducer from "./slices/profileUserSlice";
import { postsApi } from "./api/postsApi";
import { commentsApi } from "./api/commentsApi";
import { repliesApi } from "./api/repliesApi";
import { tagsApi } from "./api/tagsApi";
import { reactionsApi } from "./api/postReactionsApi";

const store = configureStore({
  reducer: {
    auth: authReducer,
    comments: commentsReducer,
    categories: categoriesReducer,
    tags: tagsReducer,
    profile: profileUserReducer,
    post: postReducer,
    [postsApi.reducerPath]: postsApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [repliesApi.reducerPath]: repliesApi.reducer,
    [tagsApi.reducerPath]: tagsApi.reducer,
    [reactionsApi.reducerPath]: reactionsApi.reducer,
  },
  middleware: (mid) =>
    mid().concat(
      postsApi.middleware,
      commentsApi.middleware,
      repliesApi.middleware,
      tagsApi.middleware,
      reactionsApi.middleware
    ),
});
export default store;
