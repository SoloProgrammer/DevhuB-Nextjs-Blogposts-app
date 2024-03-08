"use client";
import styles from "./auth-form.module.css";
import React from "react";
import Commonbtn from "../Commonbtn/Commonbtn";
import Loader from "../Loader/Loader";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";
import { useTheme } from "@/context/ThemeContext";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const AuthFrom = ({
  isSignIn,
  onSubmit,
  isSubmitting,
  zodValidationSchema,
}) => {
  const { theme } = useTheme();

  const { status } = useSession();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(zodValidationSchema),
  });

  const handleCredentialsLogin = (data) => {
    const { email, password, name, bio } = data;
    const payload = isSignIn
      ? { email, password }
      : { name, email, password, bio };
    onSubmit(payload);
  };

  return (
    <div className={`${styles.container}`}>
      <div className={styles.wrapper}>
        <form
          className={styles.inputBox}
          onSubmit={handleSubmit(handleCredentialsLogin)}
        >
          {!isSignIn && (
            <Controller
              control={control}
              name="name"
              defaultValue={""}
              render={({ field }) => (
                <InputBox type={"name"} value={field.value} errors={errors}>
                  <input
                    autoFocus
                    {...field}
                    ref={register("name").ref}
                    autoComplete="off"
                    type="text"
                    id="name"
                  />
                  <label htmlFor="name">Username</label>
                </InputBox>
              )}
            />
          )}
          <Controller
            control={control}
            rules={{
              required: "Email is required!",
            }}
            name="email"
            render={({ field }) => (
              <InputBox type={"email"} errors={errors} value={field.value}>
                <input
                  {...field}
                  autoFocus={isSignIn}
                  ref={register("email").ref}
                  autoComplete="off"
                  type="text"
                  id="email"
                />
                <label htmlFor="email">Email</label>
              </InputBox>
            )}
          />
          <Controller
            control={control}
            rules={{
              required: "Password is required",
            }}
            name="password"
            render={({ field }) => (
              <InputBox type={"password"} errors={errors} value={field.value}>
                <input
                  {...field}
                  ref={register("password").ref}
                  autoComplete="off"
                  type="password"
                  id="password"
                  isValid
                />
                <label htmlFor="password">Password</label>
              </InputBox>
            )}
          />
          {!isSignIn && (
            <Controller
              name="crnfpassword"
              control={control}
              rules={{
                required: "Confirm password is required",
              }}
              render={({ field }) => (
                <InputBox
                  type={"crnfpassword"}
                  errors={errors}
                  value={field.value}
                >
                  <input
                    {...field}
                    ref={register("crnfpassword").ref}
                    autoComplete="off"
                    type="crnfpassword"
                    id="crnfpassword"
                  />
                  <label htmlFor="crnfpassword">Confirm password</label>
                </InputBox>
              )}
            />
          )}
          {!isSignIn && (
            <Controller
              control={control}
              name="bio"
              rules={{
                required: "Bio is required",
              }}
              render={({ field }) => (
                <InputBox
                  type={"bio"}
                  errors={errors}
                  value={field.value}
                  classNames={styles.textareaInpt}
                >
                  <textarea
                    {...register("bio", { required: "bio is required" })}
                    autoComplete="off"
                    type="bio"
                    id="bio"
                  />
                  <label htmlFor="bio">Bio</label>
                </InputBox>
              )}
            />
          )}
          <Commonbtn
            size="medium"
            type="submit"
            text={isSubmitting ? "" : isSignIn ? "Sign in" : "Sign up"}
            isAnimate={false}
            disabled={isSubmitting}
            icon={isSubmitting ? <Loader size="mini" /> : ""}
          />
        </form>
        <div className={styles.subtext}>
          <Link href={isSignIn ? "/signup" : "/sign-in"}>
            {isSignIn
              ? "New to DevhuB, let's go and create an account!"
              : "Already have an account? SignIn"}
          </Link>
        </div>
        <div className={styles.crossline}>
          <span>OR</span>
        </div>
        <h2 className={styles.h2}>Continue with</h2>
        <div className={styles.socialLinks}>
          <div onClick={() => signIn("google")} className={styles.socialLink}>
            {status === "isSubmitting" ? (
              <Loader size="small" />
            ) : (
              <>
                <div className={styles.imgContainer}>
                  <Image
                    src="https://cdn-icons-png.flaticon.com/512/300/300221.png"
                    fill
                    alt="google_icon"
                  />
                </div>
              </>
            )}
          </div>
          <div
            onClick={() => signIn("github")}
            className={`${styles.socialLink} ${
              theme !== "dark" ? "" : styles.darkIcon
            }`}
          >
            <div className={styles.imgContainer}>
              <Image
                src="https://cdn-icons-png.flaticon.com/512/2111/2111432.png"
                fill
                alt="google_icon"
              />
            </div>
          </div>
          <div onClick={() => signIn("facebook")} className={styles.socialLink}>
            <div className={styles.imgContainer}>
              <Image
                src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                fill
                alt="google_icon"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputBox = ({ value, errors, type, classNames, children }) => {
  return (
    <div
      className={`${classNames} ${styles.inpt} ${value ? styles.valid : ""} ${
        errors[type] ? styles.error : ""
      }`}
    >
      <>{children}</>
      <small
        style={{
          fontSize: ".8rem",
        }}
      >
        {errors[type]?.message}
      </small>
    </div>
  );
};

export default AuthFrom;
