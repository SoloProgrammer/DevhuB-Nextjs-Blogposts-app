import prisma from "@/utils/connect";
import { Response } from "@/utils/responses";

export const GET = async (req) => {
  try {
    const popular_posts = await prisma.Post.findMany({
      take: 4,
      skip: 0,
      where: {
        views: {
          gt: 5,
        },
      },
      orderBy: {
        views: "desc",
      },
      include: { user: true },
    });
    return Response("", 200, true, false, { popular_posts });
  } catch (error) {
    return Response("Some error occured", 500, false, error);
  }
};
