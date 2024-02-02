const { getAuthSession } = require("@/utils/auth");
import { TryCatch } from "@/helpers/ErrorHandler";
import prisma from "@/lib/connect";
import { Response } from "@/utils/responses";

// GET session/profile user data
export const GET = TryCatch(async (req) => {
  const { searchParams } = new URL(req.url);

  const id = searchParams.get("id");
  let query = {};
  if (!id) {
    const session = await getAuthSession();
    if (!session) return Response("Not authenticated", 401, false, true);
    query = { where: { email: session.user.email } };
  } else {
    query = { where: { id } };
  }
  const user = await prisma.User.findUnique(query);

  if (!user) {
    return Response("Some error occured", 404, false, {
      message: "User not found",
    });
  }

  const postCount = await prisma.Post.count({
    where: { userEmail: user.email },
  });

  user.postCount = postCount;

  return Response("", 200, true, false, { user });
});
