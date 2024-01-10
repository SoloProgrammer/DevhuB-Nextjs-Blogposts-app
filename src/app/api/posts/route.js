import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// Get posts
export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const page = searchParams.get("page");
  const category = searchParams.get("category");
  const POSTS_PER_PAGE = 4;

  let query = {
    take: POSTS_PER_PAGE,
    skip: POSTS_PER_PAGE * (page - 1),
    where: {
      ...(category && { catSlug: category }),
    },
    orderBy: {
      createdAt: 'desc'
    }
  };
  try {
    const [posts, postsCount] = await prisma.$transaction([
      prisma.Post.findMany(query),
      prisma.Post.count({
        where: {
          ...(category && { catSlug: category }),
        },
      }),
    ]);
    return new NextResponse(JSON.stringify({ posts, postsCount, status: 200 }));
  } catch (error) {
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong!",
        status: 500,
        error: error.message,
      })
    );
  }
};
