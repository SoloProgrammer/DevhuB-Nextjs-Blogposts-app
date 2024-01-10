import { Response } from "@/utils/responses";

export const TryCatch = (handler) => {
  return (req, ...args) =>
    Promise.resolve(handler(req, ...args)).catch((err) =>
      Response("Internal server error!", err.statusCode || 500, false, err)
    );
};
