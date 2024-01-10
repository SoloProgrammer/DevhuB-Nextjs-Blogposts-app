"use client";

import { savePost, unSavePost } from "@/redux/slices/authSlice";
import { api } from "@/utils/api";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Styles from "./saveposticon.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loader from "../Loader/Loader";

const SavePostIcon = ({ slug, postId }) => {
  const { user, loading } = useSelector((state) => state.auth);

  const [isSaving, setIsSaving] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  function toggleFill(target) {
    target.innerText =
      target.innerText === "bookmark_add" ? "bookmark_added" : "bookmark_add";
    target.classList.toggle("fill");
  }
  const hanldeSavePost = async (e) => {
    e.stopPropagation();

    if (!user) return router.push("/login");
    setIsSaving(true);
    if (e.target.classList.contains("fill")) {
      toggleFill(e.target);
      dispatch(unSavePost({ postId }));
    } else {
      toggleFill(e.target);
      dispatch(savePost({ postId }));
    }
    setTimeout(() => {
      setIsSaving(false);
    }, 350);
    const options = {
      method: "PUT",
    };
    await fetch(api.savePost(slug), options);
  };
  if (loading) return <></>;

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "2px",
        cursor: "pointer",
      }}
    >
      {isSaving ? (
        <Loader size="mini" />
      ) : (
        <span
          onClick={hanldeSavePost}
          className={`${Styles.saveIcon} material-symbols-outlined ${
            user?.savedPosts.includes(postId) ? "fill" : ""
          }`}
        >
          {user?.savedPosts.includes(postId)
            ? "bookmark_added"
            : "bookmark_add"}
        </span>
      )}
      {!user && !loading && (
        <Link href={"/login"}>
          <small>Login to save this post!</small>
        </Link>
      )}
    </div>
  );
};

export default SavePostIcon;
