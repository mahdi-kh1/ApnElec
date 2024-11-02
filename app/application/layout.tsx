"use client";

import { Suspense } from "react";
import Navbar from "@/components/application/Navbar";
import Footer from "@/components/Footer";

export default function ApplicationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Suspense fallback={<div className="h-16 bg-slate-100 " />}>
        <Navbar />
      </Suspense>
      <main className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}