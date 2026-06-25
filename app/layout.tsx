import "./globals.css";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { Poppins, JetBrains_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-provider";
import CustomCursor from "@/components/common/CustomCursor";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Payal Yadav",
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
        jetbrainsMono.variable,
        "font-sans",
      )}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <CustomCursor />
            {children}
            <Toaster />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
