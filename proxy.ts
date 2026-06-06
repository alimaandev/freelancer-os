import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/auth/signin",
  "/auth/signup",
  "/signin",
  "/signup",
]);

export default clerkMiddleware(async (auth, req) => {
  // If user is signed in and trying to access public routes, redirect to dashboard
  if ((await auth()).userId && isPublicRoute(req)) {
    return Response.redirect(new URL("/dashboard", req.url));
  }
  // If user is not signed in and trying to access protected routes, redirect to sign in
  if (!(await auth()).userId && !isPublicRoute(req)) {
    return Response.redirect(new URL("/auth/signin", req.url));
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};