"use client";

import { useEffect, useState } from "react";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { useAuthentication } from "@/states";
import DashboardSidebar from "@/components/dashboard/sidebar";
import DashboardHeader from "@/components/dashboard/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user: currentUser } = useAuthentication();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // useEffect(() => {
  //   if (!currentUser) {
  //     // Store the current URL to sessionStorage
  //     sessionStorage.setItem("redirectAfterLogin", window.location.pathname);
  //     router.push('/application?#sign-in-method');
  //   }
  // }, [currentUser, router]);

  // Handle closing sidebar when route changes on mobile
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [router]);

  // Don't render the dashboard if there's no user
  if (!currentUser) {
    return null;
  }

  return (
    <div className="flex h-screen bg-background">
      <DashboardSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-auto p-4 md:p-6 bg-default-50">
          <div className="max-w-7xl mx-auto">
            <Suspense fallback={<div>Loading...</div>}>
              {children}
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}
