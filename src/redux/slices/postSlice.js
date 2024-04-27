import { createSlice } from "@reduxjs/toolkit";

const initialState = { post: null };

export const postSlice = createSlice({                      
  initialState, // and this is the initial state that can be used in every child component
  name: "postSlice",
  reducers: {
    setPost: (state, { payload }) => { // this is the reducer functon
      state.post = payload;
    },
    updateReactions: (state, { payload }) => { // explain them that this is the reducaer function that updates the rections in the post 
      state.post.reactions = payload;
    },
  },
});

export const { setPost, updateReactions } = postSlice.actions;

export default postSlice.reducer;
