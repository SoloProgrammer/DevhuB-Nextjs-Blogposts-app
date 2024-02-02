import { TryCatch } from "@/helpers/ErrorHandler";
import prisma from "@/lib/connect";
import { Response } from "@/utils/responses";

export const PUT = TryCatch(async (req) => {
  const { credentials } = await req.json();

  const { email, password } = credentials;

  if (!email || !password) throw new Error("Email and password is required!");

  const user = await prisma.User.findUnique({
    where: { email },
    include: { accounts: true },
  });

  if (!user) {
    throw new Error("User not found with this email");
  }
  let accountProvider = user?.accounts[0]?.provider || null;

  if (accountProvider) {
    throw new Error(
      `This account has been already signed in with ${accountProvider}, please continue with ${accountProvider}`
    );
  }

  if (user.password !== password) {
    throw new Error("Incorrect password!");
  }

  return Response("User authenticated!", 200, true, false, { user });
});

export const POST = TryCatch(async (req) => {
  const credentials = await req.json();

  const { email } = credentials;

  let user = await prisma.User.findUnique({ where: { email } });

  if (user) {
    throw new Error("User with this email already exists!");
  }

  user = await prisma.User.create({
    data: { ...credentials },
  });
  return Response("Account created successfully!", 201, true, false, { user });
});
