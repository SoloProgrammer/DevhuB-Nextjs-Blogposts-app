import { createSlice } from "@reduxjs/toolkit";

const initialState = { post: null };

export const postSlice = createSlice({
  initialState,
  name: "postSlice",
  reducers: {
    setPost: (state, { payload }) => {
      state.post = payload;
    },
    updateReactions: (state, { payload }) => {
      state.post.reactions = payload;
    },
  },
});

export const { setPost, updateReactions } = postSlice.actions;

export default postSlice.reducer;
