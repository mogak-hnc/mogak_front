import type { Metadata } from "next";
import "./globals.css";
import Header from "./Component/layout/header";
import Footer from "./Component/layout/footer";

export const metadata: Metadata = {
  title: "모각",
  description: "모여서 각자",
  icons: {
    icon: `/favicon.ico`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className="font-sans flex flex-col min-h-screen bg-background  text-text dark:bg-background-dark dark:text-text-dark transition-colors duration-100">
        <Header />
        <div className="flex-grow p-4 px-16">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
