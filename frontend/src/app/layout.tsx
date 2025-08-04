import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";

// Inter for better readability and modern look
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700'],
});

// JetBrains Mono for code elements
const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: 'swap',
  weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
  title: "Website Idea Generator | AI-Powered Section Creation",
  description: "Transform your website ideas into structured sections with AI. Generate professional website layouts in seconds with intelligent section recommendations.",
  keywords: "website generator, AI website builder, section generator, web development, Next.js, NestJS",
  authors: [{ name: "Website Idea Generator" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" }
  ],
  manifest: "/manifest.json",
  robots: "index, follow",
  openGraph: {
    title: "Website Idea Generator | AI-Powered Section Creation",
    description: "Transform your website ideas into structured sections with AI",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased theme-transition min-h-screen bg-background text-foreground`}
        style={{ fontFamily: 'var(--font-inter), var(--font-sans)' }}
      >
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col">
            <main className="flex-1">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
