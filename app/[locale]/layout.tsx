import type { Metadata } from "next";
import Header from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Toaster } from "@/components/ui/sonner";
import { TanstackProvider } from "@/components/provider/tanstack.provider";
import MajHtml from "@/components/maj-html/maj-html";
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
  setRequestLocale(locale);
  const messages = await getMessages();
  return (
    <TanstackProvider dehydratedState={null}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <Header />
        <main className="xl:max-w-7xl max-w-6xl mx-auto px-4 xl:px-0 ">
          {children}
        </main>
        <Footer />
        <Toaster
          toastOptions={{
            className:
              "bg-white/50 dark:!bg-slate-900/50 backdrop-blur-sm z-50",
            style: {
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
            },
          }}
          closeButton
          position="top-right"
        />
        <MajHtml />
      </NextIntlClientProvider>
    </TanstackProvider>
  );
}
