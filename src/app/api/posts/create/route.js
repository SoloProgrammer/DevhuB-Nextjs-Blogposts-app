import { TryCatch } from "@/helpers/ErrorHandler";
import { authenticate } from "@/middlewares/getAuthSession";
import { sendEmail } from "@/services/sendMail";
import prisma from "@/utils/connect";
import { Response } from "@/utils/responses";

const createPostHandler = async (req) => {
  const { session } = req;
  const body = await req.json();
  if (!body) return Response("Body not send with the req", 400);

  let { tags, ...remainingBody } = body;

  // converting tag object from {slug:react} to {tagSlug:react}
  tags = tags.map((tag) => ({ tagSlug: tag.slug }));

  const post = await prisma.Post.create({
    data: {
      ...remainingBody, // remainingBodyData - title, desc, slug, img
      tags: { create: tags }, // creating postTags
      userEmail: session.user.email,
    },
    include: { user: true },
  });

  // Sending Emails to subscribers of post author!
  sendEmail(
    `"Dev_Blog/@${post.user.name}" prathamshinde987@gmail.com`,
    post.user.subscribers, // receivers email list
    `Dev_Blog - New Post from ${post.user.name}`,
    post
  );

  return Response("Post created successfully!", 201, true, false);
};
export const POST = TryCatch(authenticate(createPostHandler));
