'use client';

import { UserButton, SignInButton, SignUpButton, useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import Link from "next/link";

interface NavigationProps {
  onScroll: (id: string) => void;
}

export default function Navigation({ onScroll }: NavigationProps) {
  const { isSignedIn, isLoaded } = useAuth();

  return (
    <nav className="depth-nav sticky top-0 z-50 flex items-center justify-between py-8 bg-white/80 backdrop-blur-md">
      <div className="text-2xl tracking-tight text-black">
        <Link href="/">Freelancer OS</Link>
      </div>
      <div className="flex items-center gap-8">
        <button
          onClick={() => onScroll('features')}
          className="depth-link text-sm text-gray-600 hover:text-black transition-colors duration-300"
        >
          Platform
        </button>
        <button
          onClick={() => onScroll('trust')}
          className="depth-link text-sm text-gray-600 hover:text-black transition-colors duration-300"
        >
          Why Us
        </button>
        <div className="flex items-center gap-4">
          {isLoaded && isSignedIn ? (
            <>
              <Link
                href="/dashboard"
                className="depth-button px-6 py-3 bg-black text-white rounded-full hover:bg-gray-900 transition-all duration-300 text-sm"
              >
                Dashboard
              </Link>
              <UserButton />
            </>
          ) : (
            <>
              <SignInButton mode="modal">
                <button className="depth-link text-sm text-gray-600 hover:text-black transition-colors duration-300">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton mode="modal">
                <button className="depth-button px-6 py-3 bg-black text-white rounded-full hover:bg-gray-900 transition-all duration-300 text-sm">
                  Get Started
                </button>
              </SignUpButton>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
