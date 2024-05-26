import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  loading: true,
};

const auth = createSlice({
  initialState,
  name: "authSlice",
  reducers: {
<<<<<<< HEAD
    addUser: (state, { payload }) => {
      state.user = payload;
    },
=======
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
>>>>>>> fdac5fa (connected local repo to remote repo)
    savePost: (state, { payload }) => {
      state.user.savedPosts.push(payload.postId);
    },
    unSavePost: (state, { payload }) => {
      state.user.savedPosts = state.user.savedPosts.filter(
        (pid) => pid !== payload.postId
      );
    },
<<<<<<< HEAD
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
=======
>>>>>>> fdac5fa (connected local repo to remote repo)
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
<<<<<<< HEAD
  addUser,
=======
  setUser,
>>>>>>> fdac5fa (connected local repo to remote repo)
  savePost,
  unSavePost,
  followAuthor,
  unFollowAuthor,
  setLoading,
} = auth.actions;
export default auth.reducer;
