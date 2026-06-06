import type { Metadata } from "next";
import { Open_Sans, Saira } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";


const saira = Saira({
  variable: "--font-saira",
  subsets: ["latin"],
});

export const metadata: Metadata = {

  title: "Freelancer OS",
  description: "Client Portal SaaS for freelancers and agencies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        className={`${saira.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col">{children}</body>
      </html>
    </ClerkProvider>
  );
}
