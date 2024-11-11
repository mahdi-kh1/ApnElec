// ApplicationLayout.tsx

"use client";

import { Suspense } from "react";
import Navbar from "@/components/application/Navbar";
import Footer from "@/components/application/Footer";
import LoadingAnimation from "@/components/LoadingAnimation";

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-gray-100 text-gray-900 min-h-screen">
      <Suspense fallback={<LoadingAnimation />}>
        <Navbar />
      </Suspense>
      <main className="min-h-screen">{children}</main>
      <Footer />
    </div>
  );
}
