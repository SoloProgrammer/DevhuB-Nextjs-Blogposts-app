import { getAuthSession } from "@/utils/auth";
import { Response } from "@/utils/responses";

// Middleware function to authenticate user on server side
export const authenticate = (handler) => {
  return async (req, ...args) => {
    const session = await getAuthSession();
    if (!session) return Response("Not authenticated", 401, false, true);
    req.session = session;
    return handler(req, ...args);
  };
};
