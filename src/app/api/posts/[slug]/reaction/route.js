import { TryCatch } from "@/helpers/ErrorHandler";
import { authenticate } from "@/middlewares/getAuthSession";
import prisma from "@/utils/connect";
import { Response } from "@/utils/responses";

const reactionHandler = async (req, { params }) => {
  const { slug } = params;
  const { searchParams } = new URL(req.url);

  const reactionType = searchParams.get("type");

  if (!reactionType) return Response("reactionType is manditory ");

  const session = req.session;

  const user = await prisma.User.findUnique({
    where: { email: session.user.email },
  });

  if (!user)
    return Response("User malfunctioned!", 400, false, {
      message: "User malfunctioned!",
    });

  const userId = user.id;

  let post = await prisma.Post.findUnique({
    where: { slug },
  });

  let message = "reaction added";

  let reactions = structuredClone(post.reactions);

  if (reactions.hasOwnProperty(reactionType)) {
    if (reactions[reactionType].includes(userId)) {
      reactions[reactionType] = reactions[reactionType].filter(
        (uId) => uId !== userId
      );
      message = "reaction removed";
    } else {
      reactions[reactionType].push(userId);
    }
  } else {
    reactions[reactionType.toLowerCase()] = [userId];
  }

  post = await prisma.Post.update({
    where: { slug },
    data: { reactions }, // set will not used here because set is used to update the array value not the object!
  });

  return Response(message, 200, true, false, {
    reactionType,
    reactions,
  });
};

export const PUT = TryCatch(authenticate(reactionHandler));
