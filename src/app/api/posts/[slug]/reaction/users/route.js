import { TryCatch } from "@/helpers/ErrorHandler";
import prisma from "@/lib/connect";
import { Response } from "@/utils/responses";

export const GET = TryCatch(async (req, { params }) => {
  const { slug } = params;

  const { searchParams } = new URL(req.url);

  const reactiontype = searchParams.get("reactiontype");

  if (!reactiontype) return Response("Invalid reactionType", 400, false, true);

  const post = await prisma.Post.findUnique({
    where: { slug },
    select: {
      reactions: true,
    },
  });

  const { reactions } = post;

  const reactionUserIds = reactions[reactiontype];

  if (!reactionUserIds)
    return Response("Invalid reactionType", 400, false, true);

  const users = await prisma.User.findMany({
    where: {
      id: {
        in: reactionUserIds,
      },
    },
    select: {
      id: true,
      image: true,
      bio: true,
      email: true,
      name: true,
    },
  });

  return Response("", 200, true, false, { users });
});
