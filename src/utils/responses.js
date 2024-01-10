import { NextResponse } from "next/server";

export const Response = (message, status, success = false, error, data) =>
  new NextResponse(
    JSON.stringify({
      message,
      success,
      error: error?.message || false,
      ...data,
    }),
    { status }
  );
