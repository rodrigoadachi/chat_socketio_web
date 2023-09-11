"use client";

import "./globals.css";
import Header from "@/app/components/Header";
import { GlobalContextProvider } from "./Context/user";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <GlobalContextProvider>
            <main className="flex min-h-screen min-w-screen flex-col items-center lg:p-40 glow">
              <Header />
              {children}
            </main>
          </GlobalContextProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
