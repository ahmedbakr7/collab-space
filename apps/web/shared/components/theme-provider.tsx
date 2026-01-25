"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ComponentProps, PropsWithChildren } from "react";

type NextThemesProviderProps = ComponentProps<typeof NextThemesProvider>;

export function ThemeProvider({
    children,
    ...props
}: PropsWithChildren & NextThemesProviderProps) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
