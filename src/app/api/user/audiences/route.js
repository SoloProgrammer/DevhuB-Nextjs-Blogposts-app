import { TryCatch } from "@/helpers/ErrorHandler";
import prisma from "@/utils/connect";
import { Response } from "@/utils/responses";

export const GET = TryCatch(async (req) => {
  const { searchParams } = new URL(req.url);
  const audienceType = searchParams.get("audienceType");
  const authorId = searchParams.get("authorId");
  if (!audienceType || !authorId) {
    return Response(
      "Audience Type Or authorId not passed with the request!",
      400,
      false
    );
  }
  const author = await prisma.User.findUnique({
    where: {
      id: authorId,
    },
  });

  if (!author) {
    return Response("Invalid authorId", 400, false);
  }

  const audiences = await prisma.User.findMany({
    where: {
      id: {
        in: author[audienceType],
      },
    },
    select: {
      email: true,
      id: true,
      image: true,
      name: true,
    },
  });

  return Response("Success", 200, true, false, {
    author: author.name,
    [audienceType]: audiences,
  });
});
