"use client";

import React from "react";
import { useEffect } from "react";
import { SignUp, useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

export function SignUpPageClient() {
  const { isSignedIn, isLoaded } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      const redirectTo = searchParams.get("redirect_to") || "/dashboard";
      router.push(redirectTo);
    }
  }, [isSignedIn, isLoaded, router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">Create your Freelancer OS account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Already have an account{" "}
            <Link href="/auth/signin" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign in
            </Link>
          </p>
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md">
          <SignUp
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

