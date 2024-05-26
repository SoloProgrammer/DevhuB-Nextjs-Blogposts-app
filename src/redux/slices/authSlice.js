import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: true,
};

const auth = createSlice({
  initialState,
  name: "authSlice",
  reducers: {
    addUser: (state, { payload }) => {
      state.user = payload;
    },
    savePost: (state, { payload }) => {
      state.user.savedPosts.push(payload.postId);
    },
    unSavePost: (state, { payload }) => {
      state.user.savedPosts = state.user.savedPosts.filter(
        (pid) => pid !== payload.postId
      );
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    followAuthor: (state, { payload }) => {
      state.user.following.push(payload.authorId);
    },
    unFollowAuthor: (state, { payload }) => {
      state.user.following = state.user.following.filter(
        (id) => id !== payload.authorId
      );
    },
  },
});

export const {
  addUser,
  savePost,
  unSavePost,
  followAuthor,
  unFollowAuthor,
  setLoading,
} = auth.actions;
export default auth.reducer;
