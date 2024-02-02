"use client";

import React, { Suspense, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import Loader from "@/components/Loader/Loader";
import { useRouter } from "next/navigation";
import HomePageLoading from "@/app/(HomePage)/loading";
import AuthFrom from "@/components/AuthFrom/AuthFrom";
import toast from "react-hot-toast";
import { showToast } from "@/utils/toast";
import { z } from "zod";

var toastId;
const schema = z
  .object({
    name: z.string().min(3, { message: "Username must be 3 characters long!" }),
    email: z.string().email(),
    password: z
      .string()
      .min(5, { message: "Password must be 5 characters long!" }),
    crnfpassword: z
      .string()
      .min(5, { message: "Confirm Password must be 5 characters long!" }),
    bio: z.string().min(20, { message: "Bio must be 20 characters long!" }),
  })
  .refine((data) => data.password === data.crnfpassword, {
    message: "Passwords don't match",
    path: ["crnfpassword"], // path of error
  }); // we can chain more refine functions if we want!

const SignUpPage = () => {
  const router = useRouter();
  const { status } = useSession();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSignUp = async (credentials) => {
    // Todo react hook form validation
    setIsSubmitting(true);
    const res = await signIn("custom-signup", {
      ...credentials,
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
        isSignIn={false}
        isSubmitting={isSubmitting}
        onSubmit={onSignUp}
        zodValidationSchema={schema}
      />
    </Suspense>
  );
};

export default SignUpPage;
