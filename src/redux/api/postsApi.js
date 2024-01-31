import { server } from "@/services/api";
import { axiosBaseQuery } from "@/services/axiosClient";
import { createApi } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: axiosBaseQuery({
    baseURL: server.URL + "/api/posts",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (queryParams) => ({ url: `?${queryParams}` }),
    }),
    getPost: builder.query({
      query: (slug) => ({ url: `/${slug}` }),
    }),
    deletePost: builder.query({
      query: (slug) => ({
        url: `/${slug}`,
        method: "DELETE",
      }),
    }),
    savePost: builder.mutation({
      query: (slug) => ({
        url: `/${slug}/save`,
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useLazyGetPostsQuery,
  useGetPostQuery,
  useSavePostMutation,
  useLazyDeletePostQuery,
} = postsApi;
