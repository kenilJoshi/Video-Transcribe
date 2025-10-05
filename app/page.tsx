// app/page.tsx (Server Component - Prerendered)

import HeroSection from '@/components/landing_page/HeroSection';
import Features from '@/components/landing_page/Features';
import Pricing from '@/components/landing_page/Pricing';
import CTASection from '@/components/landing_page/CTASection';
import Footer from '@/components/landing_page/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <HeroSection />
      <Features />
      <Pricing />
      <CTASection />
      <Footer />
    </main>
  );
}