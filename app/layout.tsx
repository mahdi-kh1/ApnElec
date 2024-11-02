import "../styles/globals.css";
import type { Metadata } from "next";
import { cn } from "@/utils";
import { fontMono, fontSans } from "@/configs/fonts";
import { AppProvider } from "./provider";

export const metadata: Metadata = {
  title: "ApnElec",
  description: "Apn Electronics",
  creator:"Apn Electronics",
};

const LoadingFallback = () => (
  <div className="h-16 bg-background/70 backdrop-blur-lg" />
);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" className="h-max">
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
          fontMono.variable
        )}
      >
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}