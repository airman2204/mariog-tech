import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ExecutiveSnapshot from '@/components/ExecutiveSnapshot';
import RoleFitMatcher from '@/components/RoleFitMatcher';
import SprintMetrics from '@/components/SprintMetrics';
import KanbanBoard from '@/components/KanbanBoard';
import CaseStudies from '@/components/CaseStudies';
import DeliveryPlaybook from '@/components/DeliveryPlaybook';
import AiCopilot from '@/components/AiCopilot';
import BookingSection from '@/components/BookingSection';
import MobileContactBar from '@/components/MobileContactBar';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/context/LanguageContext';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#0a0e27] pb-16 md:pb-0">
        <Navbar />
        <main>
          <Hero />
          <ExecutiveSnapshot />
          <RoleFitMatcher />
          <SprintMetrics />
          <KanbanBoard />
          <CaseStudies />
          <DeliveryPlaybook />
          <AiCopilot />
          <BookingSection />
        </main>
        <Footer />
        <MobileContactBar />
        <Analytics />
        <SpeedInsights />
      </div>
    </LanguageProvider>
  );
}

export default App;
