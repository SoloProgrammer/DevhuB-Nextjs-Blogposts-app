import { useTheme } from "@/context/ThemeContext";
import { Avatar, Card, CardActionArea, CardHeader } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import FollowUserBtn from "../UserProfileComponents/FollowUserBtn/FollowUserBtn";
import { getUserSlug } from "@/app/posts/[slug]/page";
import styles from "./usersList.module.css";

const UsersList = ({ users }) => {
  const { theme } = useTheme();
  const router = useRouter();

  return users.map((user) => (
    <Card
      onClick={() => router.push(`/dev/${getUserSlug(user)}`)}
      key={user.id}
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
          sx={{
            padding: "0px",
          }}
          avatar={<Avatar src={user.image} aria-label="recipe" />}
          title={user.name}
          subheader={user.email}
        />
        <div className={styles.folllowBtn}>
          <FollowUserBtn author={user} size="small" />
        </div>
      </CardActionArea>
    </Card>
  ));
};

export default UsersList;
