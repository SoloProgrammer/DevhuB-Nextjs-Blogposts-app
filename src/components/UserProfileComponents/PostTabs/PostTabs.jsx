"use client";

import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import PostList from "../PostsList/PostList";
import { useDispatch } from "react-redux";
import { clearProfileData, newProfile } from "@/redux/slices/profileUserSlice";

export default function PostTabs({ profileUser }) {
  const [value, setValue] = React.useState("1");

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    profileUser && dispatch(newProfile({ profile: profileUser }));

    // cleanUp function
    // to clear cached/stored user profile data - useFull when we redirect from one profile page to other we will always see the profile users data instead of any user profile stored previously
    return () => dispatch(clearProfileData());
  }, [profileUser?.id]);

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            variant="scrollable"
            onChange={handleChange}
            aria-label="lab API tabs example"
          >
            <Tab label="All Posts" value="1" />
            <Tab label="Saved Posts" value="2" />
            <Tab label="Activities" value="3" />
            <Tab label="Settings" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <PostList profileUser={profileUser} key={value} />
        </TabPanel>
        <TabPanel value="2">
          <PostList profileUser={profileUser} saved={true} key={value} />
        </TabPanel>
        <TabPanel value="3">Activities</TabPanel>
        <TabPanel value="4">Settings</TabPanel>
      </TabContext>
    </Box>
  );
}
