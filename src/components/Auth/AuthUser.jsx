"use client";

import { api } from "@/services/api";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, setLoading } from "@/redux/slices/authSlice";
import useSWR from "swr";
import axiosClient from "@/services/axiosClient";
import { TryCatchWrapper } from "@/helpers/ErrorHandler";

const fetcher = TryCatchWrapper(async (url) => {
  const { data } = await axiosClient.get(url);
  return data;
});

const AuthUser = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { data, isLoading } = useSWR(!user ? api.getUser() : null, fetcher);
  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);
  if (data) {
    dispatch(addUser(data.user));
  }
  return <></>;
};

export default AuthUser;
