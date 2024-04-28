import { Header } from './_components/header';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'Hacker News',
  description: 'Exactly like Reddit, but with less cats.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex min-h-screen w-full flex-col">
          <Header />
          <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
            <div className="mx-auto">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
