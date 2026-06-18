import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "%s | СЕПТИК ГАРАНТ",
    default: "СЕПТИК ГАРАНТ — Продажа и монтаж септиков",
  },
  description: "Продажа, монтаж и обслуживание септиков под ключ. Гарантия до 50 лет. Монтаж за 1 день. Работаем по всей России.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}
