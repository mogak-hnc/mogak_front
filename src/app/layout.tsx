import type { Metadata } from "next";
import "./globals.css";
import Header from "./Component/layout/header";
import Footer from "./Component/layout/footer";

export const metadata: Metadata = {
  title: "모각",
  description: "모여서 각자",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className="flex flex-col min-h-screen bg-background  text-text dark:bg-background-dark dark:text-text-dark transition-colors duration-100">
        <Header />
        <div className="flex-grow p-4">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
