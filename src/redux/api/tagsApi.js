import { axiosBaseQuery } from "@/services/axiosClient";
import { createApi } from "@reduxjs/toolkit/query/react";

export const tagsApi = createApi({
  reducerPath: "tagsApi",
  baseQuery: axiosBaseQuery({
    baseURL: `tags`,
  }),
  endpoints: (builder) => ({
    getTags: builder.query({
      query: () => ({
        url: "/",
      }),
    }),
  }),
});

export const { useLazyGetTagsQuery } = tagsApi;
