import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SwiftSwap - Buy USDT & USDC with PayPal & SWIFT",
  description: "Where Institutional Security Meets Blockchain Speed. Buy USDT and USDC on BSC Network with PayPal and SWIFT bank transfers.",
  icons: {
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmtGvNatQa1u-8NyykAn1ARjgCXFUOxpCZlMoPiE3MSg&s",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
