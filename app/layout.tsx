import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "每日巡店系统",
  description: "高效管理每日巡店任务",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <meta httpEquiv="Permissions-Policy" content="clipboard-read=*, clipboard-write=*" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
