import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@propelauth/nextjs/client";
import Nav from "@/components/nav";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { EditContextProvider } from "@/lib/context";
import { cn } from "@/lib/utils";
import { PHProvider } from "@/lib/analytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DCMH Pantry",
  description: "Inventory Management for DCMH",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <AuthProvider authUrl={process.env.NEXT_PUBLIC_AUTH_URL!}>
        <PHProvider>
          <body className={cn(inter.className, "bg-[#e0f2ff] dark:bg-black")}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <EditContextProvider>
                {/* <PostHogPageView /> */}
                <div className="min-h-screen flex flex-col">
                  <Nav />
                  <div className="flex-1">{children}</div>
                  <Footer />
                </div>
              </EditContextProvider>
              <Toaster />
            </ThemeProvider>
          </body>
        </PHProvider>
      </AuthProvider>
    </html>
  );
}
