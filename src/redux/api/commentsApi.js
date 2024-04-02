import { axiosBaseQuery } from "@/services/axiosClient";
import { createApi } from "@reduxjs/toolkit/query/react";

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: axiosBaseQuery({
    baseURL: `comments`,
  }),
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (postSlug) => ({
        url: `?postSlug=${postSlug}`,
      }),
    }),
    newComment: builder.mutation({
      query: (newComment) => ({
        url: `/`,
        method: `POST`,
        data: newComment,
      }),
    }),
    updateComment: builder.mutation({
      query: ({ commentId, updatedData }) => ({
        url: `?id=${commentId}`,
        method: `PUT`,
        data: updatedData,
      }),
    }),
    deleteComment: builder.query({
      query: (commentId) => ({
        url: `?id=${commentId}`,
        method: "DELETE",
      }),
    }),
  }),
});
export const {
  useLazyGetCommentsQuery,
  useNewCommentMutation,
  useUpdateCommentMutation,
  useLazyDeleteCommentQuery,
} = commentsApi;
