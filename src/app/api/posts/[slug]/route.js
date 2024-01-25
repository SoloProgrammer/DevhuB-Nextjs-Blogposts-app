import { cloudinaryDeleteImg } from "@/helpers/Cloudinary";
import { TryCatch } from "@/helpers/ErrorHandler";
import prisma from "@/utils/connect";
import { Response } from "@/utils/responses";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { slug } = params;

  try {
    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        user: true,
        tags: {
          include: {
            tag: {
              select: {
                id: true,
                slug: true,
                icon: true,
                clr: true,
              },
            },
          },
        },
      },
    });
    if (!post) return Response("Post not found!", 404, false);

    const response = Response("Success", 200, true, false, { post });
    return response;
  } catch (error) {
    console.log(error);
    return new NextResponse(
      JSON.stringify({
        message: "Something went wrong!",
        status: 500,
        error: error.message,
      })
    );
  }
};

export const DELETE = TryCatch(async (req, { params }) => {
  const { slug } = params;

  // deleting PostTag first to delete the post!
  await prisma.PostTag.deleteMany({
    where: { postSlug: slug },
  });
  const [post] = await prisma.$transaction([
    prisma.Post.findUnique({ where: { slug } }),
    prisma.Post.delete({ where: { slug } }),
  ]);

  // delete the image of the deleted post from cloud
  const imgPathSplited = post.img.split("/");
  const imgName = imgPathSplited[imgPathSplited.length - 1].split(".")[0];
  cloudinaryDeleteImg(imgName);
  return Response("Post deleted successfully!", 200, true);
});
