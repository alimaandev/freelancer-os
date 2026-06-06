"use client";

import { useEffect } from "react";
import { SignIn, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function SignInPage() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Handle redirect after successful sign in
    if (isLoaded && isSignedIn) {
      // Get the redirect URL from search params or default to dashboard
      const redirectTo = searchParams.get("redirect_to") || "/dashboard";

      // Redirect to dashboard
      router.push(redirectTo);
    }
  }, [isSignedIn, isLoaded, router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to Freelancer OS
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{" "}
            <Link
              href="/auth/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              create a new account
            </Link>
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <SignIn
            appearance={{
              elements: {
                formButtonPrimary:
                  "bg-black hover:bg-gray-900 text-white font-medium py-2 px-4 rounded-md",
                card: "border-0 shadow-none",
                headerTitle: "text-2xl font-bold text-center",
                headerSubtitle: "text-sm text-gray-600 text-center",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}