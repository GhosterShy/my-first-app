import "./globals.css";
import Head from "next/head";
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'bahandi - напитки',
  description: 'Магазин напитков bahandi',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" precedence="default"/>
    
      <body style={{ margin: 0, padding: 0 }}>
        {children}
      </body>
     

    </html>
  );
}
