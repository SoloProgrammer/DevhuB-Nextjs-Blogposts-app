import { cloudinaryDeleteImg } from "@/helpers/Cloudinary";
import { TryCatch } from "@/helpers/ErrorHandler";
import prisma from "@/utils/connect";
import { Response } from "@/utils/responses";

export const GET = TryCatch(async (req, { params }) => {
  const { slug } = params;

  const [post] = await prisma.$transaction([
    prisma.post.findUnique({
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
    }),
    prisma.post.update({
      where: {
        slug,
      },
      data: {
        views: {
          increment: 1,
        },
      },
    }),
  ]);
  if (!post) return Response("Post not found!", 404, false);

  return Response("Success", 200, true, false, { post });
});

export const DELETE = TryCatch(async (req, { params }) => {
  const { slug } = params;

  // deleting PostTag first to delete the post!
  const [post] = await prisma.$transaction([
    prisma.Post.findUnique({ where: { slug } }),
    prisma.PostTag.deleteMany({ where: { postSlug: slug } }),
    prisma.Comment.deleteMany({ where: { postSlug: slug } }),
    prisma.Post.delete({ where: { slug } }),
  ]);

  // delete the image of the deleted post from cloudinary
  const imgPathSplited = post.img.split("/");
  const imgName = imgPathSplited[imgPathSplited.length - 1].split(".")[0];
  cloudinaryDeleteImg(imgName);
  return Response("Post deleted successfully!", 200, true);
});
