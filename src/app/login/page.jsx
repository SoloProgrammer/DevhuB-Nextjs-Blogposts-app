"use client";

import React, { Suspense, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Loader from "@/components/Loader/Loader";
import { useRouter } from "next/navigation";
import HomePageLoading from "@/app/(HomePage)/loading";
import AuthFrom from "@/components/AuthFrom/AuthFrom";
import toast from "react-hot-toast";
import { showToast } from "@/utils/toast";

var toastId;
const LoginPage = () => {
  const router = useRouter();
  const { status } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSignIn = async (credentials) => {
    const { email, password } = credentials;
    if (!email || !password) return;
    setIsSubmitting(true);
    const res = await signIn("custom-login", {
      email,
      password,
      redirect: false,
    });
    toast.dismiss(toastId);
    if (!res.ok) {
      toastId = showToast(res.error, "error", null, 5000);
    }
    setIsSubmitting(false);
  };

  if (status === "loading") {
    return (
      <div className="LoadingContainer">
        <Loader size="medium" />
      </div>
    );
  }
  if (status === "authenticated") {
    return router.push("/");
  }
  return (
    <Suspense fallback={<HomePageLoading />}>
      <AuthFrom
        isSignIn={true}
        isSubmitting={isSubmitting}
        handleSubmit={onSignIn}
      />
    </Suspense>
  );
};

export default LoginPage;
