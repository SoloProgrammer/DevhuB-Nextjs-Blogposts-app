"use client";

import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import SavePostIcon from "@/components/SavePostIcon/SavePostIcon";
import { CardActionArea } from "@mui/material";
import styles from "./postCard.module.css";
import { ThemeStates } from "@/context/ThemeContext";
import { getTrimmedString } from "@/helpers/string";
import { useRouter } from "next/navigation";
import { getFormattedPostDate } from "@/utils/date";
import { getUserSlug } from "@/app/posts/[slug]/page";

export default function PostCard({ post, profileUser }) {
  const { theme } = ThemeStates();

  return window.innerWidth > 1020 ? (
    <LandscapeCard post={post} theme={theme} profileUser={profileUser} />
  ) : (
    <PortraitCard post={post} theme={theme} profileUser={profileUser} />
  );
}

const LandscapeCard = ({ post, theme, profileUser }) => {
  const router = useRouter();
  return (
    <Card
      onClick={() => router.push(`/posts/${post.slug}`)}
      sx={{ display: "flex", width: "100%" }}
      className={`${styles.card} ${
        theme === "dark" ? styles.dark : styles.light
      }`}
    >
      <CardActionArea sx={{ flexGrow: 1 }}>
        <CardHeader
          sx={{ paddingTop: "2px" }}
          avatar={
            <Avatar
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/dev/${getUserSlug(post.user)}`);
              }}
              src={post.user.image}
              aria-label="recipe"
            />
          }
          action={
            <IconButton
              className={styles.IconButton}
              aria-label="settings"
              onClick={(e) => e.stopPropagation()}
            >
              <SavePostIcon
                slug={post.slug}
                postId={post.id}
                profileUser={profileUser}
              />
            </IconButton>
          }
          title={post.user.name}
          subheader={getFormattedPostDate(post.createdAt)}
        />
        <CardContent sx={{ paddingBottom: "2px" }}>
          <Typography variant="body2" color="text.secondary">
            {getTrimmedString(post.desc.replace(/<[^>]*>/g, ""), 110)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardMedia
        component="img"
        height="140"
        image={post.img}
        sx={{ width: 140 }}
        alt="Paella dish"
      />
    </Card>
  );
};

const PortraitCard = ({ post, theme, profileUser }) => {
  const router = useRouter();
  return (
    <Card
      sx={{ maxWidth: 300 }}
      onClick={() => router.push(`/posts/${post.slug}`)}
      className={`${styles.card} ${
        theme === "dark" ? styles.dark : styles.light
      }`}
    >
      <CardActionArea>
        <CardHeader
          avatar={
            <Avatar
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/dev/${getUserSlug(post.user)}`);
              }}
              src={post.user.image}
              aria-label="recipe"
            />
          }
          action={
            <IconButton
              className={styles.IconButton}
              aria-label="settings"
              onClick={(e) => e.stopPropagation()}
            >
              <SavePostIcon
                slug={post.slug}
                postId={post.id}
                profileUser={profileUser}
              />
            </IconButton>
          }
          title={post.user.name}
          subheader={getFormattedPostDate(post.createdAt)}
        />
        <CardMedia
          component="img"
          height="194"
          image={post.img}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {getTrimmedString(post.desc.replace(/<[^>]*>/g, ""), 95)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
