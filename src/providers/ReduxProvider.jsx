"use client";

import React from "react";
import store from "@/redux/store";
import { Provider } from "react-redux";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { postsApi } from "@/redux/api/postsApi";

const ReduxProvider = ({ children }) => {
  return (
    <ApiProvider api={postsApi}>
      <Provider store={store}>{children}</Provider>
    </ApiProvider>
  );
};

export default ReduxProvider;
