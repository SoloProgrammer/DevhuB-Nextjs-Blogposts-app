"use client";

import { api } from "@/utils/api";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, setLoading } from "@/redux/slices/authSlice";
import useSWR from "swr";

const fetcher = async (url) => {
  const res = await fetch(url, { cache: "no-store" });
  const data = await res.json();
  if (!res.ok) {
    return new Error(data.error);
  }
  return data;
};

const AuthUser = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { data, isLoading } = useSWR(!user ? api.getUser() : null, fetcher);
  useEffect(() => {
    console.log(isLoading,'---');
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);
  if (data) {
    dispatch(addUser(data.user));
  }
  return <></>;
};

export default AuthUser;
