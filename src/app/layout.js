import { Nunito_Sans } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import Header from "@/components/Header";
import { Suspense } from "react";

export const metadata = {
  title: "Frontend Mentor | REST countries",
  description: "developed by @Darkx-dev aka Roshan",
};

const nunito_sans = Nunito_Sans({
  subsets: ["latin"],
  weight: ["300", "600", "800"],
  adjustFontFallback: false,
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={nunito_sans.className}>
        <Providers>
          <Header />
          <Suspense>{children}</Suspense>
        </Providers>
      </body>
    </html>
  );
}
