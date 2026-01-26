import 'reflect-metadata';
// import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/shared/components/theme-provider';
import { PropsWithChildren } from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

// import { StoreProvider } from "@/features/shared/store-provider";

// export const metadata: Metadata = {};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <html lang="en" suppressHydrationWarning className={inter.variable}>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
