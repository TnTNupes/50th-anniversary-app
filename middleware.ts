import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authProtectedPages, publicPages } from "./authProtectedPages";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const cookieList = await cookies();
  const authUser = cookieList.get("authUser");

  // Only allow unauthenticated users to access specific pages
  console.log({ pathname });
  if (
    !authProtectedPages.includes(pathname) ||
    (!authUser && !publicPages.includes(pathname))
  ) {
    return NextResponse.next();
  }

  console.log({ authUser });

  try {
    // Make an API call to verify user status
    const { uid } = JSON.parse(authUser.value);
    const res = await fetch(`${req.nextUrl.origin}/api/verify-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ uid }), // Replace with actual UID logic
    });

    if (res.ok) {
      const text = await res.text(); // Use text() instead of json() to inspect the raw response
      const data = JSON.parse(text);
      const { authUser, user } = data;
      console.log({ text, data });
      if (user?.verified) {
        return NextResponse.next();
      } else if (authUser && user && !user?.verified) {
        return NextResponse.redirect(
          new URL("/waiting-for-verification", req.url)
        );
      }
    }
  } catch (error) {
    console.error(error);
  }

  // Redirect unauthorized users to /signin
  return NextResponse.redirect(new URL("/signin", req.url));
}
