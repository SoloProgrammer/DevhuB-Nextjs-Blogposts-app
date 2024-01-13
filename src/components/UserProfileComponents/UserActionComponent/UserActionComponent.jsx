"use client";

import React from "react";
import styles from "./userActionComponent.module.css";
import SubUnSubBtn from "@/components/UserProfileComponents/SubUnSubBtn/SubUnSubBtn";
import { useSelector } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { ThemeStates } from "@/context/ThemeContext";
import FollowUserBtn from "../FollowUserBtn/FollowUserBtn";

const UserActionComponent = ({ profileUser }) => {
  const { user, loading } = useSelector((state) => state.auth);
  if (profileUser?.id === user?.id) return <></>;

  return (
    <div className={styles.userActions}>
      {loading ? (
        <Loading />
      ) : (
        <>
          <FollowUserBtn author={profileUser} follower={user} />
          <SubUnSubBtn
            author={profileUser}
            subscriber={user}
            tooltipPlacement={"bottom"}
          />
        </>
      )}
    </div>
  );
};

const Loading = () => {
  const { skeletonTheme } = ThemeStates();
  return (
    <SkeletonTheme
      baseColor={skeletonTheme.color}
      highlightColor={skeletonTheme.highlightColor}
    >
      <Skeleton width={80} height={22} style={{ borderRadius: "1rem" }} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        <Skeleton width={100} height={22} style={{ borderRadius: "1rem" }} />
        <Skeleton width={15} height={15} borderRadius={"100%"} />
      </div>
    </SkeletonTheme>
  );
};

export default UserActionComponent;
