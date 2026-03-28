import "./globals.css";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { Poppins, Inter, Geist_Mono, Geist } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import CustomCursor from "@/components/common/custom-cursor";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-serif",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Payal Portfolio",
  description: "Full Stack Developer Portfolio",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        poppins.variable,
        inter.variable,
        geistMono.variable,
        "font-sans",
        geist.variable,
        "dark",
        "h-2500",
      )}
    >
      <body className="min-h-full flex flex-col">
        <TooltipProvider>
          <CustomCursor />
          {children}
          <Toaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
