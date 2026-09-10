import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import SprintMetrics from '@/components/SprintMetrics';
import KanbanBoard from '@/components/KanbanBoard';
import AiCopilot from '@/components/AiCopilot';
import BookingSection from '@/components/BookingSection';
import Footer from '@/components/Footer';
import { LanguageProvider } from '@/context/LanguageContext';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#0a0e27]">
        <Navbar />
        <main>
          <Hero />
          <SprintMetrics />
          <KanbanBoard />
          <AiCopilot />
          <BookingSection />
        </main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </div>
    </LanguageProvider>
  );
}

export default App;
