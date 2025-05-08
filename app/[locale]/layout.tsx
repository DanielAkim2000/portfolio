import type { Metadata } from "next";
import { Ubuntu_Sans } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Toaster } from "@/components/ui/sonner";
import { TanstackProvider } from "@/components/provider/tanstack.provider";

const ubuntuSans = Ubuntu_Sans({
  variable: "--font-ubuntu-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Portfolio de Akim Emane",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const messages = await getMessages();
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${ubuntuSans.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TanstackProvider dehydratedState={null}>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <Header />
              <main className="xl:max-w-7xl max-w-6xl mx-auto px-4 xl:px-0">
                {children}
              </main>
              <Footer />
              <Toaster
                toastOptions={{
                  className:
                    "bg-white/50 dark:!bg-slate-900/50 backdrop-blur-sm",
                  style: {
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                  },
                }}
              />
            </NextIntlClientProvider>
          </TanstackProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
