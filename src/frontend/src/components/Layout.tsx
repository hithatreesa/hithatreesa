import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

/**
 * Root layout wrapper — provides full-height dark background, overflow control.
 * Header and Footer are composed at the App level (inside each page section),
 * so Layout stays minimal and non-intrusive for 3D full-bleed sections.
 */
export function Layout({ children }: LayoutProps) {
  return (
    <div className="relative min-h-screen bg-background text-foreground overflow-x-hidden">
      {children}
    </div>
  );
}
