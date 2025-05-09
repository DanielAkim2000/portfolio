import React from "react";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Ubuntu_Sans } from "next/font/google";

const ubuntuSans = Ubuntu_Sans({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-ubuntu-sans",
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${ubuntuSans.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
