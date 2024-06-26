"use client";
import AuthFrom from "./AuthFrom/AuthFrom";
import Loader from "../Loader/Loader";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useRef, useState } from "react";
import { z } from "zod";
import { showToast } from "@/utils/toast";

const schema = z
  .object({
    name: z.string().min(3, { message: "Username must be 3 characters long" }),
    email: z.string().min(1, { message: "Email cannot be empty" }).email(),
    password: z
      .string()
      .min(5, { message: "Password must be 5 characters long" }),
    crnfpassword: z
      .string()
      .min(5, { message: "Confirm Password must be 5 characters long" }),
    bio: z.string().min(20, { message: "Bio must be 20 characters long" }),
  })
  .refine((data) => data.password === data.crnfpassword, {
    message: "Passwords don't match",
    path: ["crnfpassword"], // path of error
  }); // we can chain more refine functions if we want!

const SignUp = () => {
  const router = useRouter();
  const { status } = useSession();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const toastId = useRef(null);
  const onSignUp = async (credentials) => {
    setIsSubmitting(true);
    const res = await signIn("custom-signup", {
      ...credentials,
      redirect: false,
    });
    toastId.current && toast.dismiss(toastId.current);
    if (!res.ok) {
      toastId.current = showToast(res.error, "error", null, 5000);
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
    <AuthFrom
      isSignIn={false}
      isSubmitting={isSubmitting}
      onSubmit={onSignUp}
      zodValidationSchema={schema}
    />
  );
};

export default SignUp;
