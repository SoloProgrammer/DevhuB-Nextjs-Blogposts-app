import { Response } from "@/utils/responses";

export const ABORTERROR = "AbortError";
export const ABORTERROR_MESSAGE = "You cancelled previous request!";

export const TryCatch = (handler) => {
  return (req, ...args) =>
    Promise.resolve(handler(req, ...args)).catch((err) =>
      Response("Internal server error!", err.statusCode || 500, false, err)
    );
};
