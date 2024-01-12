import { TryCatch } from "@/helpers/ErrorHandler";
import { authenticate } from "@/middlewares/getAuthSession";
import prisma from "@/utils/connect";
import { Response } from "@/utils/responses";

export const PUT = TryCatch(async (req) => {
  const { searchParams } = new URL(req.url);
  const authorId = searchParams.get("author");
  const followerId = searchParams.get("follower");

  if (!authorId || !followerId) {
    return Response("Error", 400, false, {
      message: "Follower and author both are manditory to pass in params",
    });
  }

  const [author, follower] = await prisma.$transaction([
    prisma.User.findUnique({ where: { id: authorId } }),
    prisma.User.findUnique({ where: { id: followerId } }),
  ]);

  if (!author || !follower) {
    return Response("Error", 400, false, {
      message: "Invalid author or follower Id",
    });
  }

  if (author.followers.includes(followerId)) {
    await prisma.User.update({
      where: { id: authorId },
      data: {
        followers: {
          set: author.followers.filter(
            (followerId) => followerId !== follower.id
          ),
        },
      },
    });

    await prisma.User.update({
      where: { id: followerId },
      data: {
        following: {
          set: follower.following.filter(
            (followingId) => followingId !== author.id
          ),
        },
      },
    });
    return Response(`Unfollowed to ${author.name}`);
  } else {
    await prisma.User.update({
      where: { id: authorId },
      data: {
        followers: {
          push: followerId,
        },
      },
    });
    await prisma.User.update({
      where: { id: followerId },
      data: {
        following: {
          push: authorId,
        },
      },
    });
    return Response(`Started Following to ${author.name}`);
  }
});
