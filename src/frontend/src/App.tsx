import { Header } from "@/components/Header";
import { Layout } from "@/components/Layout";
import { Suspense, lazy } from "react";

// Lazy-load heavy 3D sections
const HeroSection = lazy(() => import("@/pages/HeroSection"));
const ServicesSection = lazy(() => import("@/pages/ServicesSection"));
const ShowcaseSection = lazy(() => import("@/pages/ShowcaseSection"));
const PreFooterCTA = lazy(() => import("@/pages/PreFooterCTA"));
const FooterSection = lazy(() => import("@/pages/FooterSection"));

function SectionFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <Layout>
      <Header />
      <main>
        <Suspense fallback={<SectionFallback />}>
          <HeroSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ServicesSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ShowcaseSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <PreFooterCTA />
        </Suspense>
        <Suspense fallback={<div className="h-64 bg-card" />}>
          <FooterSection />
        </Suspense>
      </main>
    </Layout>
  );
}
