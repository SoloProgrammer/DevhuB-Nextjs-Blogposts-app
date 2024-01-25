import { server } from "@/services/api";
import { axiosBaseQuery } from "@/services/axiosClient";
import { createApi } from "@reduxjs/toolkit/query/react";

export const tagsApi = createApi({
  reducerPath: "tagsApi",
  baseQuery: axiosBaseQuery({
    baseURL: `${server.URL}/api`,
  }),
  endpoints: (builder) => ({
    getTags: builder.query({
      query: () => ({
        url: "/tags",
      }),
    }),
  }),
});

export const { useLazyGetTagsQuery } = tagsApi;
