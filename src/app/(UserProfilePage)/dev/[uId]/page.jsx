import { extractRawUserIdFromSlug } from "@/app/posts/[slug]/page";
import { api } from "@/services/api";
import React, { Suspense } from "react";
import CustomError from "@/lib/exceptions";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import PostTabs from "@/components/UserProfileComponents/PostTabs/PostTabs";
import Image from "next/image";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import UserProfileLoadingSkeleton from "./loading";
import UserActionComponent from "@/components/UserProfileComponents/UserActionComponent/UserActionComponent";

export const USER_NOT_FOUND = "User not found";
export const INTERNAL_SERVER_ERROR = "Internal server error";

const getUser = async (id) => {
  const query = `?id=${id}`;
  const res = await fetch(api.getUser(query), { cache: "no-store" });
  if (!res.ok) {
    if (res.status === 404) throw new CustomError(USER_NOT_FOUND, 404);
    throw new CustomError(INTERNAL_SERVER_ERROR, 404);
  }
  return res.json();
};

const UserProfilePage = async ({ params }) => {
  const uId = extractRawUserIdFromSlug(params.uId);
  const { user } = await getUser(uId);
  if (!user) return notFound();
  return (
    <>
      <Suspense fallback={<UserProfileLoadingSkeleton />}>
        <div className={styles.container}>
          <div className={styles.left}>
            <div className={styles.userImg}>
              <Image src={user.image.split("=")[0].concat("=s300-c")} fill />
            </div>
            <div className={styles.details}>
              <Typography textAlign={"center"} variant="h4">
                {user.name}
              </Typography>
              <Typography variant="subtitle1" className={styles.userEmail}>
                {user.email}
              </Typography>
            </div>
            <UserActionComponent profileUser={user} />
            <Divider variant="fullWidth" />
          </div>
          <div className={styles.right}>
            <div className={styles.aboutSection}></div>
            <div className={styles.postsSection}>
              <PostTabs profileUser={user} />
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
};

export default UserProfilePage;
