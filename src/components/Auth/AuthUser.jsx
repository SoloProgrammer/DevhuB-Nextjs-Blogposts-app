"use client";

import { api } from "@/services/api";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
<<<<<<< HEAD
import { addUser, setLoading } from "@/redux/slices/authSlice";
=======
import { setUser, setLoading } from "@/redux/slices/authSlice";
>>>>>>> fdac5fa (connected local repo to remote repo)
import axiosClient from "@/services/axiosClient";
import { showToast } from "@/utils/toast";
import { useSession } from "next-auth/react";

const AuthUser = () => {
  const dispatch = useDispatch();

  const { data } = useSession();

  useEffect(() => {
    const getUser = async () => {
      try {
        dispatch(setLoading(true));
        let { data } = await axiosClient.get(api.getUser());
<<<<<<< HEAD
        dispatch(addUser(data.user));
=======
        dispatch(setUser(data.user));
>>>>>>> fdac5fa (connected local repo to remote repo)
      } catch (error) {
        showToast("You are not logged in!", "", "🧑‍💻");
      } finally {
        dispatch(setLoading(false));
      }
    };
    getUser();

    return () => {};
  }, [data?.user]);
  return <></>;
};

export default AuthUser;
