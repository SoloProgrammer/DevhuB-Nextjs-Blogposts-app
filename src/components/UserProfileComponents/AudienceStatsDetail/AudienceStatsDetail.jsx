"use client";

import React, { useState } from "react";
import styles from "./audienceStatsDetail.module.css";
import { ThemeStates } from "@/context/ThemeContext";
import { Box, Tab, Tabs } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { TabContext } from "@mui/lab";
import { audiences } from "../UserActionComponent/UserActionComponent";

const AudienceStatsDetail = ({ audiencetype }) => {
  const selectedTabValue = {
    [audiences.FOLLOWERS]: "1",
    [audiences.FOLLOWING]: "2",
    [audiences.SUBSCRIBERS]: "3",
  };
  const { theme } = ThemeStates();
  const [value, setValue] = useState(selectedTabValue[audiencetype]);
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
  return (
    <div
      className={`${styles.container} ${show && styles.show} ${
        theme === "dark" ? styles.dark : styles.light
      }`}
    >
      <div className={`${styles.wrapper}`}>
        Followers List
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
              Followers
            </TabPanel>
            <TabPanel value={"2"} index={1}>
              Following
            </TabPanel>
            <TabPanel value={"3"} index={2}>
              Subscribers
            </TabPanel>
          </Box>
        </TabContext>
      </div>
    </div>
  );
};

export const audienceList = (audienceType, author) => {};

export default AudienceStatsDetail;
