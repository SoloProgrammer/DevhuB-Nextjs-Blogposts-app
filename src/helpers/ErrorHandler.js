import CustomError from "@/lib/exceptions";
import { Response } from "@/utils/responses";

// Error constants....
export const ABORTERROR = "AbortError";
export const ABORTERROR_MESSAGE = "You cancelled previous request!";

export const NOT_FOUND = "Not Found";
export const INTERNAL_SERVER_ERROR = "Internal server error";

// Trycatch for server side api routes
export const TryCatch = (handler) => {
  return (req, ...args) =>
    Promise.resolve(handler(req, ...args)).catch((err) =>
      Response("Something went wrong!", err.statusCode || 500, false, err)
    );
};

// Trycatch for server side componenet data fetching....
export const TryCatchWrapper = (fetcher) => {
  return async (...args) => {
    try {
      return await fetcher(...args);
    } catch (err) {
      let statusCode = err.response.status;
      if (statusCode === 404) {
        err.statusCode = 404;
        throw new CustomError(NOT_FOUND);
      } else throw new Error(INTERNAL_SERVER_ERROR);
    }
  };
};
