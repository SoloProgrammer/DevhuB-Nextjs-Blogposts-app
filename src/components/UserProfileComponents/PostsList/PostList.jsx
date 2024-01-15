"use client";

import React, { useEffect, useState } from "react";
import styles from "./postsList.module.css";
import PostCard from "../PostCard/PostCard";
import { api } from "@/services/api";
import { showToast } from "@/utils/toast";
import Loader from "@/components/Loader/Loader";
import { Pagination, Typography } from "@mui/material";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { addPosts, addSavedPosts } from "@/redux/slices/profileUserSlice";

var prevoiusPage;

const PostList = ({ saved }) => {
  const { user: loggedInUser } = useSelector((state) => state.auth);
  const {
    posts: allPosts,
    savedPosts,
    profile: profileUser,
  } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  const [currPage, setCurrPage] = useState(1);

  // Retrieving stored posts of profile user from redux
  const initialPosts = saved ? savedPosts : allPosts;

  // Component (posts + loading) local states
  const [posts, setPosts] = useState(
    initialPosts ? initialPosts[currPage] : initialPosts
  );
  const [loading, setLoading] = useState(false);

  // Pagination states + logic
  const [postsCount, setPostsCount] = useState(
    saved ? profileUser?.savedPosts.length : profileUser?.postCount
  );
  const POSTS_PER_PAGE = 4;
  let pages = Math.ceil(postsCount / POSTS_PER_PAGE);

  const getPostsOfUser = async (currPage) => {
    if (saved && profileUser?.savedPosts.length < 1) return setPosts([]);
    else if (profileUser?.postCount < 1) return setPosts([]);

    if (initialPosts && Object.keys(initialPosts).includes(String(currPage))) {
      return setPosts(initialPosts[currPage]);
    }

    try {
      const query = `?uId=${profileUser?.id}&page=${currPage}&${
        saved ? `saved=true` : ""
      }`;
      setLoading(true);
      const res = await fetch(api.getPosts(query), { cache: "no-store" });
      if (!res.ok) {
        throw new Error("Internal server error");
      }
      const json = await res.json();
      setPostsCount(json.postsCount);
      setPosts(json.posts);
      dispatch(
        saved
          ? addSavedPosts({ savedPosts: json.posts, page: currPage })
          : addPosts({ posts: json.posts, page: currPage })
      );
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(currPage, profileUser?.savedPosts.length);
    if (
      saved && currPage > 1 &&
      profileUser?.savedPosts.length === (currPage - 1) * POSTS_PER_PAGE
    ) {
      console.log(currPage, profileUser.savedPosts.length);
      setCurrPage((page) => page - 1);
    }
  }, [profileUser?.savedPosts.length]);

  useEffect(() => {
    if (
      (prevoiusPage && prevoiusPage !== currPage) ||
      (profileUser?.id && !initialPosts)
    ) {
      getPostsOfUser(currPage);
    }

    // scrolling Tabs view after fetching new page posts when page is changed
    let subscribersText = document.getElementById("subscribersText");
    prevoiusPage &&
      prevoiusPage !== currPage &&
      setTimeout(() => {
        window.innerWidth > 770
          ? window.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          : subscribersText &&
            subscribersText.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
      }, 100);

    prevoiusPage = currPage;
  }, [profileUser?.id, currPage, initialPosts]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.postsContainer}>
        {loading && <Loader />}
        {!loading &&
          posts?.map((post) => {
            return (
              <PostCard key={post.id} post={post} profileUser={profileUser} />
            );
          })}
      </div>
      {posts?.length > 0 && !loading && (
        <Pagination
          sx={{ display: "flex", justifyContent: "center" }}
          page={currPage}
          onChange={(e, page) => setCurrPage(page)}
          count={pages}
          color="primary"
        />
      )}
      {posts && posts?.length < 1 && !loading && (
        <div
          style={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h5" textAlign={"center"}>
            {profileUser?.id === loggedInUser?.id ? "You" : profileUser?.name}{" "}
            hasn't {saved ? "saved" : "posted"} any posts yet
          </Typography>
          <div className={styles.postsNotFoundImage}>
            <Image
              fill
              src="https://cdni.iconscout.com/illustration/premium/thumb/not-found-4064375-3363936.png"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PostList;
