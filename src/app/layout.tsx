import type { Metadata } from "next";
import { Mona_Sans } from "next/font/google";
import "./globals.css";
import { RouteProvider } from "@/providers/route-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { Toaster } from "@/components/ui/sonner";

const monaSans = Mona_Sans({
  variable: "--font-mona-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CubeGrab",
  description: "A Real-Estate platform for bringing buyers and sellers together.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning
    lang="en" 
    className={`${monaSans.className} h-full antialiased`}>
      <body className="min-h-full flex flex-col text-foreground">
        <Toaster richColors position="top-right" toastOptions={{className:"border border-var[var(--color-accent-gold)] bg-[var(--color-background)] text-foreground",}} />
        <ThemeProvider>
          <RouteProvider>
            {children}
          </RouteProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
