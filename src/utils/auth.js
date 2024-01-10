import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import FacebookProvider from "next-auth/providers/facebook"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "./connect"
import { getServerSession } from "next-auth"

export const authOptions = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
            issuer: process.env.NEXTAUTH_URL
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET,
        }),
    ],
}

export const getAuthSession = () => getServerSession(authOptions)