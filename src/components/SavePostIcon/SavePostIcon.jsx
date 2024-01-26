"use client";

import { savePost, unSavePost } from "@/redux/slices/authSlice";
import { api } from "@/services/api";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Styles from "./saveposticon.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loader from "../Loader/Loader";
import {
  addToSavedPostsSavedPostsInProfile,
  clearSavedPosts,
  removeFromSavedPostsInProfile,
} from "@/redux/slices/profileUserSlice";
import { showToast, toastStatus } from "@/utils/toast";

const SavePostIcon = ({ slug, postId, profileUser }) => {
  const { user: loggedInUser, loading } = useSelector((state) => state.auth);

  const { profile } = useSelector((state) => state.profile);

  // If profile user is there then we check that the profilUser and LoggedIn user is same if they are same then the uer value will be the loggedIn user because any update in the user data will only be reflected to the loggedinuser value because its value is coming from redux
  // if the profile user is there and loggedInuser doesn't match with the profile user we assign profileUser value to const [user] variable
  // if profileUser is not there then the value of the user variable is loggedIn user itself and that valids for each n every page other than profile page

  const user =
    profileUser && profileUser.id === loggedInUser?.id
      ? loggedInUser
      : profileUser || loggedInUser;

  const [isSaving, setIsSaving] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  function toggleSave(target) {
    target.innerText =
      target.innerText === "bookmark_add" ? "bookmark_added" : "bookmark_add";
    target.classList.toggle("fill");
  }
  const hanldeSavePost = async (e) => {
    e.stopPropagation();

    if (!user) return router.push("/login");
    try {
      const options = {
        method: "PUT",
      };
      setIsSaving(true);
      const res = await fetch(api.savePost(slug), options);
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.error);
      }
      if (e.target.classList.contains("fill")) {
        toggleSave(e.target);
        dispatch(unSavePost({ postId }));
      } else {
        toggleSave(e.target);
        dispatch(savePost({ postId }));
      }

      router.refresh();

      if (profile) {
        profile.savedPosts.includes(postId)
          ? dispatch(removeFromSavedPostsInProfile({ postId }))
          : dispatch(addToSavedPostsSavedPostsInProfile({ postId }));
      }

      dispatch(clearSavedPosts());
    } catch (error) {
      showToast(
        "Some error happens, please try again later!",
        toastStatus.ERROR
      );
    } finally {
      setIsSaving(false);
    }
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
        cursor:
          !profileUser || profileUser?.id === loggedInUser?.id
            ? "pointer"
            : "not-allowed",
      }}
    >
      {isSaving ? (
        <Loader size="mini" />
      ) : (
        <span
          style={{
            color: user?.savedPosts.includes(postId) ? "var(--main-color)" : "",
          }}
          onClick={
            !profileUser || profileUser?.id === loggedInUser?.id
              ? hanldeSavePost
              : () => {}
          }
          className={`${Styles.saveIcon} material-symbols-outlined ${
            user?.savedPosts.includes(postId) ? "fill" : ""
          }`}
        >
          {user?.savedPosts.includes(postId)
            ? "bookmark_added"
            : "bookmark_add"}
        </span>
      )}
      {!user && !loading && !profileUser && (
        <Link href={"/login"}>
          <small className={Styles.loginText}>Login to save this post!</small>
        </Link>
      )}
    </div>
  );
};

export default SavePostIcon;
