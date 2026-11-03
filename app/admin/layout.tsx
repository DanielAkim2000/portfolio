import { AuthSessionProvider } from "@/components/admin/session-provider";
import { Toaster } from "@/components/ui/sonner";

export const metadata = {
  title: "Admin | Portfolio",
};

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthSessionProvider>
      <div className="min-h-screen bg-background">{children}</div>
      <Toaster position="top-right" />
    </AuthSessionProvider>
  );
}
