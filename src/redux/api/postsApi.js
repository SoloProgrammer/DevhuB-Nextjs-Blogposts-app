import { server } from "@/services/api";
import { axiosBaseQuery } from "@/services/axiosClient";
import { createApi } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: axiosBaseQuery({
    baseURL: server.URL + "/api",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (queryParams) => ({ url: `/posts?${queryParams}` }),
    }),
    getPost: builder.query({
      query: (slug) => ({ url: `/posts/${slug}` }),
    }),
  }),
});

export const { useGetPostsQuery, useLazyGetPostsQuery, useGetPostQuery } =
  postsApi;
