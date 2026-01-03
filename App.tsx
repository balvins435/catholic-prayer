
import React, { useState } from 'react';
// FIX: Removed lazy and Suspense. Statically import components to avoid dynamic import issues in the sandbox.
import Header from './components/Header.tsx';
import Footer from './components/Footer.tsx';
import DailyReadingsView from './components/DailyReadingsView.tsx';
import PrayersView from './components/PrayersView.tsx';

type View = 'readings' | 'prayers';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('readings');

  const renderView = () => {
    switch (currentView) {
      case 'readings':
        return <DailyReadingsView />;
      case 'prayers':
        return <PrayersView />;
      default:
        return <DailyReadingsView />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f7f5] text-gray-800 flex flex-col">
      <Header currentView={currentView} setCurrentView={setCurrentView} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* FIX: Removed Suspense wrapper as components are no longer lazy-loaded. The components handle their own loading state for data fetching. */}
        {renderView()}
      </main>
      <Footer />
    </div>
  );
}
