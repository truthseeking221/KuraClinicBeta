import type { Metadata } from "next";
import "./globals.css";

// Direct module import: the root layout is a Server Component, and the ui
// barrel would pull client-context modules into the RSC graph.
import { Toaster } from "../components/ui/toast";
import { DemoSessionProvider } from "./_demo/demo-session";
import { DemoLocaleProvider } from "./_demo/locale-bridge";

export const metadata: Metadata = {
  title: "Kura Clinic",
  description: "Kura clinic prototype assembled from the canonical design system.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full">
        <DemoSessionProvider>
          <DemoLocaleProvider>
            {children}
            <Toaster />
          </DemoLocaleProvider>
        </DemoSessionProvider>
      </body>
    </html>
  );
}
