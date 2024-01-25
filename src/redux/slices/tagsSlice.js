import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tags: [],
};
export const tagSlice = createSlice({
  initialState,
  name: "tagSlice",
  reducers: {
    setTags: (state, { payload }) => {
      state.tags = payload.tags;
    },
  },
});

export const { setTags } = tagSlice.actions;
export default tagSlice.reducer;
