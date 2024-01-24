"use client";

import { api } from "@/services/api";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, setLoading } from "@/redux/slices/authSlice";
import useSWR from "swr";
import axiosClient from "@/services/axiosClient";
import { TryCatchWrapper } from "@/helpers/ErrorHandler";
import { showToast, toastStatus } from "@/utils/toast";

const fetcher = TryCatchWrapper(async (url) => {
  const { data } = await axiosClient.get(url);
  return data;
});

const AuthUser = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      dispatch(setLoading(true));
      let { data } = await axiosClient.get(api.getUser());
      console.log(data);
      dispatch(addUser(data.user));
    } catch (error) {
      showToast("You are not logged in!", "", "🧑‍💻");
    } finally {
      dispatch(setLoading(false));
    }
  };
  useEffect(() => getUser(), []);
  return <></>;
};

export default AuthUser;
