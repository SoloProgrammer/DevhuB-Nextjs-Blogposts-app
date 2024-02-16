import { server } from "@/services/api";
import { axiosBaseQuery } from "@/services/axiosClient";
import { createApi } from "@reduxjs/toolkit/query/react";

export const reactionsApi = createApi({
  baseQuery: axiosBaseQuery({
    baseURL: server.URL + `/api/posts`,
  }),
  reducerPath: "reactionsApi",
  endpoints: (builder) => ({
    updateReaction: builder.query({
      query: ({ slug, reactionType }) => ({
        url: `/${slug}/reaction?type=${reactionType}`,
      }),
    }),
    getReactionUsers: builder.query({
      query: ({ slug, reactionType }) => ({
        url: `/${slug}/reaction/users?reactiontype=${reactionType}`,
      }),
    }),
  }),
});

export const { useLazyGetReactionUsersQuery, useLazyUpdateReactionQuery } =
  reactionsApi;
