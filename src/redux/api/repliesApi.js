import { server } from "@/services/api";
import { axiosBaseQuery } from "@/services/axiosClient";
import { createApi } from "@reduxjs/toolkit/query/react";

const getCommonBaseUrl = (commentId) => `/${commentId}/reply`;

export const repliesApi = createApi({
  reducerPath: "repliesApi",
  baseQuery: axiosBaseQuery({
    baseURL: `${server.URL}/api/comments`,
  }),
  endpoints: (builder) => ({
    getReplies: builder.query({
      query: (commentId) => ({
        url: `/${commentId}/reply`,
      }),
    }),
    newReply: builder.mutation({
      query: ({ commentId, newReply }) => ({
        url: `${getCommonBaseUrl(commentId)}`,
        method: "POST",
        data: newReply,
      }),
    }),
    updateReply: builder.mutation({
      query: ({ commentId, replyId, updatedReply }) => ({
        url: `${getCommonBaseUrl(commentId)}?replyId=${replyId}`,
        method: "PUT",
        data: updatedReply,
      }),
    }),
    deleteReply: builder.query({
      query: ({ commentId, replyId }) => ({
        url: `${getCommonBaseUrl(commentId)}?replyId=${replyId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useLazyGetRepliesQuery,
  useLazyDeleteReplyQuery,
  useNewReplyMutation,
  useUpdateReplyMutation,
} = repliesApi;
