"use client";

import React, { useEffect, useState } from "react";
import styles from "./postsList.module.css";
import PostCard from "../PostCard/PostCard";
import { api } from "@/utils/api";
import { showToast } from "@/utils/toast";
import Loader from "@/components/Loader/Loader";
import { Pagination, Typography } from "@mui/material";

const PostList = ({ profileUser, saved }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const getPostsOfUser = async () => {
    try {
      const query = `?uId=${profileUser.id}&page=1&${
        saved ? `saved=true` : ""
      }`;
      setLoading(true);
      const res = await fetch(api.getPosts(query), { cache: "no-store" });
      if (!res.ok) {
        throw new Error("Internal server error");
      }
      const json = await res.json();
      setPosts(json.posts);
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    profileUser?.id &&
      setTimeout(() => {
        getPostsOfUser();
      }, 200);
  }, [profileUser.id]);
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
      {posts?.length > 0 && <Pagination count={10} color="primary" />}
      {posts.length < 1 && !loading && (
        <Typography variant="h5">
          {profileUser.name} Doesn't {saved ? "saved" : "post"} any posts yet
        </Typography>
      )}
    </div>
  );
};

export default PostList;
