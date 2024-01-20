import { extractRawUserIdFromSlug } from "@/app/posts/[slug]/page";
import { api } from "@/services/api";
import React, { Suspense } from "react";
import { notFound } from "next/navigation";
import styles from "./page.module.css";
import PostTabs from "@/components/UserProfileComponents/PostTabs/PostTabs";
import Image from "next/image";
import { Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import UserProfileLoadingSkeleton from "./loading";
import UserActionComponent from "@/components/UserProfileComponents/UserActionComponent/UserActionComponent";
import { TryCatchWrapper } from "@/helpers/ErrorHandler";
import axiosClient from "@/services/axiosClient";

const getUser = TryCatchWrapper(async (id) => {
  const query = `?id=${id}`;
  const { data } = await axiosClient.get(api.getUser(query));
  return data;
});

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
