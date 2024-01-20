import { server } from "@/services/api";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postsApi = createApi({
  reducerPath: "posts",
  baseQuery: fetchBaseQuery({
    baseUrl: server.URL + "/",
  }),
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (queryParams) => `api/posts?${queryParams}`,
    }),
  }),
});

export const { useGetPostsQuery, useLazyGetPostsQuery } = postsApi;
