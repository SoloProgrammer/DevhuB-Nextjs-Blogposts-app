import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: null,
  followers: null,
  following: null,
  subscribers: null,
  posts: null,
  savedPosts: null,
};

const profile = createSlice({
  initialState,
  name: "profileSlice",
  reducers: {
    newProfile: (state, { payload }) => {
      state.profile = payload.profile;
    },
    clearProfileData: (state) => {
      state.profile = null;
      state.followers = null;
      state.following = null;
      state.subscribers = null;
      state.posts = null;
      state.savedPosts = null;
    },
    setAudience: (state, { payload }) => {
      state[payload.audienceType] = payload.audiences;
    },
    clearFollowingAudienceInProfile: (state) => {
      state.following = null;
    },
    clearFollowersAudienceInProfile: (state) => {
      state.followers = null;
    },
    clearSubscribersAudienceInProfile: (state) => {
      state.subscribers = null;
    },
    addPosts: (state, { payload }) => {
      state.posts = { ...state?.posts, [payload.page]: payload.posts };
    },
    addSavedPosts: (state, { payload }) => {
      state.savedPosts = {
        ...state?.savedPosts,
        [payload.page]: payload.savedPosts,
      };
    },
    addToSavedPostsInProfile: (state, { payload }) => {
      state.profile.savedPosts.push(payload.postId);
    },
    removeFromSavedPostsInProfile: (state, { payload }) => {
      state.profile.savedPosts = state.profile.savedPosts.filter(
        (postId) => postId !== payload.postId
      );
    },
    clearSavedPosts: (state) => {
      state.savedPosts = null;
    },
    updateSavedPosts: (state, { payload }) => {
      state.savedPosts = payload.updatedSavedPosts;
    },
  },
});

export const {
  newProfile,
  setAudience,
  addPosts,
  addSavedPosts,
  addToSavedPostsInProfile,
  removeFromSavedPostsInProfile,
  clearFollowingAudienceInProfile,
  clearFollowersAudienceInProfile,
  clearSubscribersAudienceInProfile,
  clearProfileData,
  updateSavedPosts,
  clearSavedPosts,
} = profile.actions;
export default profile.reducer;
