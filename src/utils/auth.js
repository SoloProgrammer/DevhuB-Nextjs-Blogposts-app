import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "../lib/connect";
import { getServerSession } from "next-auth";
import axiosClient from "@/services/axiosClient";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      issuer: process.env.NEXTAUTH_URL,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      id: "custom-login",
      name: "custom-login",
      credentials: {},
      async authorize(credentials, req) {
        try {
          const { data } = await axiosClient.put(`/user/account`, {
            credentials,
          });
          return data.user;
        } catch (error) {
          error = error.response.data.error || "Something went wrong";
          throw new Error(error);
        }
      },
    }),
    CredentialsProvider({
      id: "custom-signup",
      name: "custom-signup",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password, bio, name } = credentials;
        try {
          const { data } = await axiosClient.post(`/user/account`, {
            email,
            password,
            bio,
            name,
          });
          return data.user;
        } catch (error) {
          error = error.response.data.error || "Something went wrong";
          console.log(error);
          throw new Error(error);
        }
      },
    }),
  ],
};

export const getAuthSession = () => getServerSession(authOptions);
