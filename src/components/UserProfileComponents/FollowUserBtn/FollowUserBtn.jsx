"use client";

import { Button } from "@mui/material";
import React, { useState } from "react";
import styles from "./style.module.css";
import { useDispatch, useSelector } from "react-redux";
import { api } from "@/services/api";
import { showToast, toastStatus } from "@/utils/toast";
import { useRouter } from "next/navigation";
import { followAuthor, unFollowAuthor } from "@/redux/slices/authSlice";

const FollowUserBtn = ({ author, size = "medium" }) => {
  const buttonSizes = {
    small: ".65rem",
    medium: ".75rem",
  };
  const { user, loading: userLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const isFollowing = () => {
    return user?.following.includes(author.id);
  };
  const router = useRouter();

  const followUnFollowAuthor = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      return router.push("/login");
    }

    try {
      setLoading(true);
      const query = `?authorId=${author.id}&followerId=${user?.id}`;
      const res = await fetch(api.followAuthor(query), { method: "PUT" });
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error);
      }

      const payload = { authorId: author.id };
      isFollowing()
        ? dispatch(unFollowAuthor(payload))
        : dispatch(followAuthor(payload));

      showToast(json.message, toastStatus.SUCCESS);
      router.refresh();
    } catch (error) {
      showToast(error.message, toastStatus.ERROR);
    } finally {
      setLoading(false);
    }
  };

  if (userLoading) return <></>;
  if (author.id === user?.id) return <></>;
  return (
    <Button
      sx={{ fontSize: buttonSizes[size] }}
      onClick={followUnFollowAuthor}
      disabled={loading}
      variant="outlined"
      className={styles.followBtn}
    >
      {isFollowing() ? `Following` : `Follow`}
    </Button>
  );
};

export default FollowUserBtn;
