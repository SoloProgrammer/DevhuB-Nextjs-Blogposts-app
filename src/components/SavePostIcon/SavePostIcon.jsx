"use client";

import { savePost, unSavePost } from "@/redux/slices/authSlice";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./saveposticon.module.css";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "../Loader/Loader";
import {
  addToSavedPostsSavedPostsInProfile,
  clearSavedPosts,
  removeFromSavedPostsInProfile,
} from "@/redux/slices/profileUserSlice";
import { showToast, toastStatus } from "@/utils/toast";
import { useSavePostMutation } from "@/redux/api/postsApi";

const SavePostIcon = ({ slug, postId, profileUser, showMsg = true }) => {
  const { user: loggedInUser, loading } = useSelector((state) => state.auth);

  const { profile } = useSelector((state) => state.profile);

  // If profile user is there then we check that the profilUser and LoggedIn user is same if they are same then the uer value will be the loggedIn user because any update in the user data will only be reflected to the loggedinuser value because its value is coming from redux
  // if the profile user is there and loggedInuser doesn't match with the profile user we assign profileUser value to const [user] variable
  // if profileUser is not there then the value of the user variable is loggedIn user itself and that valids for each n every page other than profile page

  const user =
    profileUser && profileUser.id === loggedInUser?.id
      ? loggedInUser
      : profileUser || loggedInUser;

  const dispatch = useDispatch();
  const router = useRouter();
  function toggleSave(target) {
    target.innerText =
      target.innerText === "bookmark_add" ? "bookmark_added" : "bookmark_add";
    target.classList.toggle("fill");
  }

  const [savePostOnServer, { isLoading, isError, error, isSuccess }] =
    useSavePostMutation();

  // taking out itinerable params map and converting it into params.entreis array like the below example
  // [['param1','value1'],['param2','value2']]
  const paramsArr = Array.from(useSearchParams().entries());
  const hanldeSavePost = async (e) => {
    e.stopPropagation();

    // here converting params entries to params string dynamically
    // ?param1=value&param2=value2....

    let paramsStr = paramsArr.reduce((str, it, i) => {
      str += `${i > 0 ? "&" : "?"}${it[0]}=${it[1]}`;
      return str;
    }, "");

    // appending ?sign-in param to the exsisting params string so that sign-in modal will open also we prevent all the dynamic data that is depend on the exsisting params on the route!
    paramsStr = paramsStr.concat(`${paramsStr.length > 0 ? "&" : "?"}sign-in`);

    // final output 
    // * (?param1=value&param2=value2&sign-in) if exsistingF params string length > 0 
    // else (?sign-in) this is the params string on those pages that don't have any exsisting params

    if (!user) return router.push(paramsStr);

    savePostOnServer(slug);
  };

  const saveIconRef = useRef(null);

  useEffect(() => {
    if (isSuccess) {
      if (saveIconRef?.current?.classList.contains("fill")) {
        toggleSave(saveIconRef?.current);
        dispatch(unSavePost({ postId }));
      } else {
        toggleSave(saveIconRef?.current);
        dispatch(savePost({ postId }));
      }

      router.refresh();

      if (profile) {
        profile.savedPosts.includes(postId)
          ? dispatch(removeFromSavedPostsInProfile({ postId }))
          : dispatch(addToSavedPostsSavedPostsInProfile({ postId }));
      }

      dispatch(clearSavedPosts());
    } else if (isError && error) {
      showToast(
        "Some error happens, please try again later!",
        toastStatus.ERROR
      );
    }
  }, [isError, error, isSuccess]);

  if (loading) return <></>;

  return (
    <div
      className={`${styles.iconWrapper}`}
      onClick={(e) => e.stopPropagation()}
      style={{
        cursor:
          !profileUser || profileUser?.id === loggedInUser?.id
            ? "pointer"
            : "not-allowed",
      }}
    >
      {isLoading ? (
        <Loader size="mini" />
      ) : (
        <span
          ref={saveIconRef}
          style={{
            color: user?.savedPosts.includes(postId) ? "var(--main-color)" : "",
          }}
          onClick={
            !profileUser || profileUser?.id === loggedInUser?.id
              ? hanldeSavePost
              : () => {}
          }
          className={`${styles.saveIcon} material-symbols-outlined ${
            user?.savedPosts.includes(postId) ? "fill" : ""
          }`}
        >
          {user?.savedPosts.includes(postId)
            ? "bookmark_added"
            : "bookmark_add"}
        </span>
      )}
      {!user && !loading && !profileUser && showMsg && (
        <Link href={"?sign-in"}>
          <small className={styles.loginText}>Sign-in to save this post!</small>
        </Link>
      )}
    </div>
  );
};

export default SavePostIcon;
