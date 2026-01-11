import type { Metadata } from 'next';
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import { Inter } from "next/font/google";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});


// import { StoreProvider } from "@/features/shared/store-provider";

interface RootLayoutProps {
    children: ReactNode;
}

// export const metadata: Metadata = {};

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <>
            <html lang="en" suppressHydrationWarning className={inter.variable}>
                <body>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="light"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <SidebarProvider >{children}</SidebarProvider>
                    </ThemeProvider>
                </body>
            </html>
        </>
    );
}
