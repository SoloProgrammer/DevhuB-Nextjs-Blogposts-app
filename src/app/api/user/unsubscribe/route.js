import { TryCatch } from "@/helpers/ErrorHandler";
import prisma from "@/utils/connect";
import { Response } from "@/utils/responses";

export const PUT = TryCatch(async (req) => {
  const { searchParams } = new URL(req.url);
  const authorId = searchParams.get("authorId");
  const userId = searchParams.get("userId");

  if (!authorId || !userId)
    return Response("Error", 400, false, {
      message: "AuthorId or userId not send with the request",
    });
  let [author, user] = await prisma.$transaction([
    prisma.User.findUnique(
      { where: { id: authorId } },
      { select: { name: true, id: true, subscribers: true } }
    ),
    prisma.User.findUnique(
      { where: { id: userId } },
      { select: { email: true } }
    ),
  ]);

  if (!author)
    return Response("Error", 400, false, { message: "Invalid authorId" });

  author = await prisma.User.update(
    {
      where: { id: authorId },
      data: {
        subscribers: {
          set: author.subscribers.filter(
            (subscriberEmail) => subscriberEmail !== user.id
          ),
        },
      },
    },
    { new: true }
  );

  return Response(`Unsubscribed Successfully`, 200, true, false, { author });
});
