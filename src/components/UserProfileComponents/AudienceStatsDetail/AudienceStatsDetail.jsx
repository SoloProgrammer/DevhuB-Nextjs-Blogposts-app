"use client";

import React, { useEffect, useState } from "react";
import styles from "./audienceStatsDetail.module.css";
import { ThemeStates } from "@/context/ThemeContext";
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardHeader,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { TabContext } from "@mui/lab";
import { audiences } from "../UserActionComponent/UserActionComponent";
import { showToast, toastStatus } from "@/utils/toast";
import { api } from "@/utils/api";
import FollowUserBtn from "../FollowUserBtn/FollowUserBtn";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/navigation";
import { getUserSlug } from "@/app/posts/[slug]/page";

const AudienceStatsDetail = ({ profileUser, audienceType }) => {
  const selectedTabValue = {
    [audiences.FOLLOWERS]: "1",
    [audiences.FOLLOWING]: "2",
    [audiences.SUBSCRIBERS]: "3",
  };
  const { theme } = ThemeStates();
  const [value, setValue] = useState(selectedTabValue[audienceType]);
  const handleChange = (e, newValue) => {
    setValue(newValue);
  };

  const [show, setShow] = useState(false);

  useState(() => {
    setTimeout(() => {
      setShow(true);
    }, 100);
    return () => setShow(false);
  }, []);

  const getSelectedAudienceType = (value) =>
    Object.keys(selectedTabValue).find(
      (key) => selectedTabValue[key] === value
    );

  return (
    <div
      className={`${styles.container} ${show && styles.show} ${
        theme === "dark" ? styles.dark : styles.light
      }`}
    >
      <div className={`${styles.wrapper}`}>
        <Typography textAlign={"left"} variant="subtitle1">
          {profileUser.name} {getSelectedAudienceType(value)} List
        </Typography>
        <TabContext value={value}>
          <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                centered
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="Followers" value={"1"} />
                <Tab label="Following" value={"2"} />
                <Tab label="Subscribers" value={"3"} />
              </Tabs>
            </Box>
            <TabPanel value={"1"} index={0}>
              <AudienceList
                key={value}
                author={profileUser}
                audienceType={getSelectedAudienceType(value)}
              />
            </TabPanel>
            <TabPanel value={"2"} index={1}>
              <AudienceList
                key={value}
                author={profileUser}
                audienceType={getSelectedAudienceType(value)}
              />
            </TabPanel>
            <TabPanel value={"3"} index={2}>
              <AudienceList
                key={value}
                author={profileUser}
                audienceType={getSelectedAudienceType(value)}
              />
            </TabPanel>
          </Box>
        </TabContext>
      </div>
    </div>
  );
};

const AudienceList = ({ audienceType, author }) => {
  audienceType = audienceType.toLowerCase();
  const { theme } = ThemeStates();
  const [audiences, setAudiences] = useState([]);
  const [loading, setLoading] = useState(false);
  const getAudiences = async (audienceType) => {
    try {
      const query = `?authorId=${author.id}&audienceType=${audienceType}`;
      setLoading(true);
      const res = await fetch(api.getAudiencesOfAuthor(query));
      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message);
      }
      const { [audienceType]: audiences } = json;
      setAudiences(audiences);
    } catch (error) {
      showToast(error.message, toastStatus.ERROR);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    author[audienceType].length > 0 && getAudiences(audienceType);
  }, [audienceType]);

  const router = useRouter();

  return (
    <div className={styles.audienceListWrapper}>
      {loading ? (
        <AudienceListLoadingSkeleton />
      ) : audiences.length < 1 ? (
        <>
          {audienceType === "following" ? (
            <Typography variant="h6" style={{ textAlign: "center" }}>
              {" "}
              {author.name} hasn't followed anyone yet!
            </Typography>
          ) : (
            <Typography variant="h6" style={{ textAlign: "center" }}>
              {author.name} has no {audienceType} yet!
            </Typography>
          )}
        </>
      ) : (
        audiences.map((audience) => {
          return (
            <Card
              onClick={() => router.push(`/dev/${getUserSlug(audience)}`)}
              key={audience.id}
              className={`${styles.card} ${theme === "dark" && styles.dark}`}
            >
              <CardActionArea
                sx={{
                  width: "100%",
                  display: "flex",
                  padding: "10px",
                  alignItems: "flex-start",
                  justifyContent: "space-between",
                }}
              >
                <CardHeader
                  sx={{ padding: "0px" }}
                  avatar={<Avatar src={audience.image} aria-label="recipe" />}
                  title={audience.name}
                  subheader={audience.email}
                />
                <div className={styles.folllowBtn}>
                  <FollowUserBtn author={audience} size="small" />
                </div>
              </CardActionArea>
            </Card>
          );
        })
      )}
    </div>
  );
};

const AudienceListLoadingSkeleton = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      {Array(4)
        .fill(0)
        .map((_, i) => (
          <Skeleton key={i} width={"100%"} height={56} />
        ))}
    </div>
  );
};

export default AudienceStatsDetail;
