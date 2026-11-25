import "./globals.css";
import { cn } from "@/lib/utils";
import type { Metadata, Viewport } from "next";
import { Toaster } from "@/components/ui/sonner";
import { Poppins, JetBrains_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-provider";
import CustomCursor from "@/components/common/CustomCursor";
import { LoadingProvider } from "@/context/LoadingContext";
import { GlobalPageLoader } from "@/components/common/GlobalPageLoader";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildPersonJsonLd,
  buildProfessionalServiceJsonLd,
  buildRootMetadata,
  buildWebsiteJsonLd,
} from "@/lib/seo";

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

export const metadata: Metadata = buildRootMetadata();

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f0f2ff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
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
        <div
          id="app-preloader"
          aria-hidden="true"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 99998,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#050810",
            backgroundImage:
              "radial-gradient(ellipse at center, transparent 20%, #050810 100%), linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)",
            backgroundSize: "100% 100%, 48px 48px, 48px 48px",
            color: "#e2e8f0",
            transition: "opacity 0.4s ease-out, filter 0.4s ease-out",
            pointerEvents: "auto",
            padding: "1rem",
            userSelect: "none",
          }}
        >
          {/* Ambient Glows */}
          <div
            style={{
              position: "absolute",
              left: "-5rem",
              top: "25%",
              width: "18rem",
              height: "18rem",
              borderRadius: "50%",
              backgroundColor: "rgba(67, 85, 232, 0.22)",
              filter: "blur(90px)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: "-5rem",
              bottom: "25%",
              width: "18rem",
              height: "18rem",
              borderRadius: "50%",
              backgroundColor: "rgba(6, 182, 212, 0.18)",
              filter: "blur(100px)",
              pointerEvents: "none",
            }}
          />

          {/* Status Pill */}
          <div
            style={{
              marginBottom: "1.75rem",
              transform: "skewX(-12deg)",
              border: "1px solid rgba(255,255,255,0.12)",
              backgroundColor: "rgba(15, 23, 42, 0.75)",
              padding: "0.375rem 1rem",
              boxShadow: "0 1px 2px rgba(0,0,0,0.2)",
            }}
          >
            <div
              style={{
                display: "flex",
                transform: "skewX(12deg)",
                alignItems: "center",
                gap: "0.625rem",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  backgroundColor: "#22c55e",
                  boxShadow: "0 0 8px #22c55e",
                }}
              />
              <p
                style={{
                  fontFamily: "var(--font-mono, monospace)",
                  fontSize: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.3em",
                  color: "#94a3b8",
                  margin: 0,
                }}
              >
                INITIALIZING EXPERIENCE
              </p>
            </div>
          </div>

          {/* Hexagon Monogram + Spinner Ring */}
          <div
            style={{
              position: "relative",
              width: "12rem",
              height: "12rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              style={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                transform: "rotate(-90deg)",
              }}
              viewBox="0 0 200 200"
            >
              <circle
                cx="100"
                cy="100"
                r="92"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="2.5"
              />
              <circle
                cx="100"
                cy="100"
                r="92"
                fill="none"
                stroke="#4355e8"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeDasharray="90 300"
                style={{
                  transformOrigin: "center",
                  animation: "spin 1.4s linear infinite",
                  filter: "drop-shadow(0 0 8px rgba(67, 85, 232, 0.8))",
                }}
              />
            </svg>

            {/* Inner Hexagon */}
            <div
              style={{
                position: "relative",
                width: "6.5rem",
                height: "6.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                viewBox="0 0 100 100"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                }}
                fill="none"
              >
                <polygon
                  points="50,4 92,27 92,73 50,96 8,73 8,27"
                  fill="rgba(15, 23, 42, 0.85)"
                  stroke="rgba(67, 85, 232, 0.6)"
                  strokeWidth="1.5"
                />
              </svg>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <span
                  style={{
                    fontSize: "1.75rem",
                    fontWeight: 800,
                    letterSpacing: "-0.04em",
                    color: "#f8fafc",
                    fontFamily: "var(--font-sans, sans-serif)",
                  }}
                >
                  PY<span style={{ color: "#4355e8" }}>.</span>
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono, monospace)",
                    fontSize: "7px",
                    textTransform: "uppercase",
                    letterSpacing: "0.25em",
                    color: "#94a3b8",
                  }}
                >
                  DEV
                </span>
              </div>
            </div>
          </div>

          {/* Title */}
          <div style={{ marginTop: "1.5rem", textAlign: "center" }}>
            <h2
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "#f8fafc",
                margin: 0,
                letterSpacing: "-0.02em",
                fontFamily: "var(--font-sans, sans-serif)",
              }}
            >
              Payal Yadav
            </h2>
            <p
              style={{
                marginTop: "0.25rem",
                fontFamily: "var(--font-mono, monospace)",
                fontSize: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.25em",
                color: "#4355e8",
                margin: 0,
              }}
            >
              &gt; Backend Engineer
            </p>
          </div>

          {/* Minimal status */}
          <div
            style={{
              marginTop: "1.5rem",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "11px",
              color: "#94a3b8",
            }}
          >
            <span style={{ color: "#4355e8", fontWeight: 700 }}>&gt;</span>
            <span>Booting runtime environment...</span>
          </div>
        </div>

        <JsonLd
          data={[
            buildPersonJsonLd(),
            buildWebsiteJsonLd(),
            buildProfessionalServiceJsonLd(),
          ]}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LoadingProvider>
            <GlobalPageLoader />
            <TooltipProvider>
              <CustomCursor />
              {children}
              <Toaster />
            </TooltipProvider>
          </LoadingProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
