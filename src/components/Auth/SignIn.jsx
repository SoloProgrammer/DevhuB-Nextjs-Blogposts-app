"use client";

import HomePageLoading from "@/app/(HomePage)/loading";
import { showToast } from "@/utils/toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import AuthFrom from "./AuthFrom/AuthFrom";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
import { z } from "zod";

var toastId;
const schema = z.object({
  email: z.string().min(1, { message: "Email cannot be empty" }).email(),
  password: z
    .string()
    .min(5, { message: "Password must be 5 characters long" }),
});

const SignIn = () => {
  useEffect(() => {
    typeof window !== "undefined" && window.scrollTo(0, 0);
  }, []);
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
        onSubmit={onSignIn}
        zodValidationSchema={schema}
      />
    </Suspense>
  );
};
export default SignIn;
