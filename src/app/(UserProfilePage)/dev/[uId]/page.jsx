import { extractRawUserIdFromSlug } from "@/app/posts/[slug]/page";
import { api } from "@/utils/api";
import React, { Suspense } from "react";
import UserProfileLoading from "./loading";
import CustomError from "@/lib/exceptions";
import { notFound } from "next/navigation";

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
  const { user } = await getUser(extractRawUserIdFromSlug(params.uId));
  if (!user) return notFound();

  return (
    <>
      <Suspense fallback={<UserProfileLoading />}>
        {/* <div>{user.name}</div> */}
      </Suspense>
    </>
  );
};

export default UserProfilePage;
