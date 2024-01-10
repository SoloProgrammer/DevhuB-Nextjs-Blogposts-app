import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    categories: null
}
const categories = createSlice({
    initialState,
    name: 'categoriesSlice',
    reducers: {
        updateCategories: (state, { payload }) => {
            state.categories = payload
        }
    }
})

export const { updateCategories } = categories.actions;
export default categories.reducer