import { Response } from "@/utils/responses";
import prisma from "@/lib/connect";
import { TryCatch } from "@/helpers/ErrorHandler";
import { authenticate } from "@/middlewares/getAuthSession";

const handleSubscriptionController = async (req) => {
  const { searchParams } = new URL(req.url);

  const subId = searchParams.get("subId");
  const authorId = searchParams.get("authorId");

  const [subscriber, author] = await prisma.$transaction([
    prisma.User.findUnique({ where: { id: subId } }),
    prisma.User.findUnique({ where: { id: authorId } }),
  ]);

  const checkIsSubscribed = () =>
    author.subscribers && author.subscribers.includes(subscriber.id); // return boolean

  const pullQuery = {
    set: author.subscribers.filter((sub) => sub !== subscriber.id),
  };
  const pushQuery = { push: subscriber.id };

  const MESSAGE = checkIsSubscribed() ? "unsubscribed" : "subscribed";

  await prisma.User.update({
    where: { id: authorId },
    data: {
      subscribers: checkIsSubscribed() ? pullQuery : pushQuery,
    },
  });

  return Response(MESSAGE, 200, true);
};

export const PUT = TryCatch(authenticate(handleSubscriptionController));
