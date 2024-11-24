import { HomeIcon, LayoutDashboardIcon } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center px-4">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <div className="space-y-6">
          <h2 className="text-3xl font-semibold">
            Page not found
          </h2>
          <p className="max-w-md mx-auto text-muted-foreground">
            Sorry, we couldn&apos;t find the page you&apos;re looking for. Please check the URL
            or try navigating back to the homepage.
          </p>
          
          <div className="flex justify-center space-x-4">
            <Link 
              href="/"
              className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <HomeIcon className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
            
            <Link
              href="/dashboard"
              className="inline-flex items-center px-4 py-2 border rounded-lg hover:bg-accent transition-colors"
            >
              <LayoutDashboardIcon className="w-4 h-4 mr-2" />
              dashboard
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}