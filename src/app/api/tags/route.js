import { TryCatch } from "@/helpers/ErrorHandler";
import prisma from "@/lib/connect";
import { Response } from "@/utils/responses";

const createTagHandler = async (req) => {
  const body = await req.json();
  const createdTag = await prisma.Tag.create({
    data: { ...body },
  });
  const tags = await prisma.Tag.findMany({
    select: {
      slug: true,
    },
  });

  return Response("Tag created", 201, true, false, { createdTag, tags });
};
export const POST = TryCatch(createTagHandler);

const getAllTagsHandler = async (req) => {
  const tags = await prisma.Tag.findMany({});
  return Response("Tags", 200, true, false, { tags });
};
export const GET = TryCatch(getAllTagsHandler);
