"use client";

import React, { useState } from "react";
import styles from "./userActionComponent.module.css";
import SubUnSubBtn from "@/components/UserProfileComponents/SubUnSubBtn/SubUnSubBtn";
import { useSelector } from "react-redux";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { ThemeStates } from "@/context/ThemeContext";
import FollowUserBtn from "../FollowUserBtn/FollowUserBtn";
import { Backdrop, Button, Divider, Modal, Typography } from "@mui/material";
import useModal from "@/Hooks/useModal";
import AudienceStatsDetail from "../AudienceStatsDetail/AudienceStatsDetail";

export const audiences = Object.freeze({
  FOLLOWERS: "Followers",
  FOLLOWING: "Following",
  SUBSCRIBERS: "Subscribers",
});

const UserActionComponent = ({ profileUser }) => {
  const { user, loading } = useSelector((state) => state.auth);

  const [isModalOpen, _, openModal, hideModal] = useModal();

  const [audienceType, setAudienceType] = useState(audiences.FOLLOWERS);

  return (
    <div>
      {/* Show follow and subscribe button to the user who visits others profile page hide when visits his own */}
      {profileUser?.id !== user?.id && (
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
      )}
      <Divider variant="fullWidth" />
      <div className={styles.audienceStats}>
        <Button
          onClick={() => {
            setAudienceType(audiences.FOLLOWERS);
            openModal();
          }}
          size="small"
          variant="text"
        >
          <span>
            {audiences.FOLLOWERS}&nbsp;<sup>{profileUser.followers.length}</sup>
          </span>
        </Button>
        <Button
          onClick={() => {
            setAudienceType(audiences.FOLLOWING);
            openModal();
          }}
          size="small"
          variant="text"
        >
          <span>
            {audiences.FOLLOWING}&nbsp;<sup>{profileUser.following.length}</sup>
          </span>
        </Button>
      </div>
      <Divider variant="fullWidth" />
      <Typography
        id="subscribersText"
        className={styles.subtitle2}
        variant="subtitle2"
      >
        <b>{audiences.SUBSCRIBERS}</b>: Users that will receive Email
        Notifications whenever you uploads new post!
      </Typography>
      <div className={styles.subscribers}>
        <Button
          onClick={() => {
            setAudienceType(audiences.SUBSCRIBERS);
            openModal();
          }}
          size="small"
          variant="text"
        >
          <p className={styles.count}>{profileUser.subscribers.length}</p>
          &nbsp;<p>Subscribers</p>
          <span className="material-symbols-outlined">mark_email_read</span>
        </Button>
      </div>

      {/* Modal audience stats detail */}
      {isModalOpen && (
        <Modal
          closeAfterTransition
          open={isModalOpen}
          onClose={hideModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <AudienceStatsDetail
            profileUser={profileUser}
            audienceType={audienceType}
          />
        </Modal>
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
