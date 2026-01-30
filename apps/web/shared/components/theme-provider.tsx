'use client';
import 'reflect-metadata';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ComponentProps, PropsWithChildren } from 'react';

if (typeof global !== 'undefined' && !global.Reflect.getMetadata) {
  // Polyfill Reflect API if missing (though import 'reflect-metadata' should handle it)
}

type NextThemesProviderProps = ComponentProps<typeof NextThemesProvider>;

export function ThemeProvider({
  children,
  ...props
}: PropsWithChildren & NextThemesProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}
