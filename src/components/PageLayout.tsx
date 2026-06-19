import React from 'react';
import { DecisionProvider } from '../context/DecisionContext';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout: React.FC<PageLayoutProps> = ({ children }) => {
  return (
    <DecisionProvider>
      <div className="min-h-screen flex flex-col bg-canvas-soft relative overflow-x-hidden">
        {/* Subtle mesh gradient background */}
        <div className="absolute top-0 left-0 w-full h-[500px] bg-mesh-gradient opacity-[0.03] pointer-events-none" />
        
        <Navbar />
        
        <main className="flex-1 w-full max-w-7xl mx-auto px-lg py-xl">
          {children}
        </main>
        
        <Footer />
      </div>
    </DecisionProvider>
  );
};
