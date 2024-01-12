"use client";

import React from "react";
import styles from "./userActionComponent.module.css";
import SubUnSubBtn from "@/components/SubUnSubBtn/SubUnSubBtn";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";

const UserActionComponent = ({ profileUser }) => {
  const { user, loading } = useSelector((state) => state.auth);
  if (profileUser?.id === user?.id || loading) return <></>;
  return (
    <div className={styles.userActions}>
      <Button variant="outlined" className={styles.followBtn}>
        Follow
      </Button>
      <SubUnSubBtn
        author={profileUser}
        subscriber={user}
        tooltipPlacement={"bottom"}
      />
    </div>
  );
};

export default UserActionComponent;
