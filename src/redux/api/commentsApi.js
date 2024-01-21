import { server } from "@/services/api";
import { axiosBaseQuery } from "@/services/axiosClient";
import { createApi } from "@reduxjs/toolkit/query/react";

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: axiosBaseQuery({
    baseURL: `${server.URL}/api/`,
  }),
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (queryParams) => ({
        url: `comments?${queryParams}`,
      }),
    }),
    newComment: builder.mutation({
      query: (newComment) => ({
        url: `comments`,
        method: `POST`,
        data: newComment,
      }),
    }),
  }),
});
export const {
  useGetCommentsQuery,
  useLazyGetCommentsQuery,
  useNewCommentMutation,
} = commentsApi;
