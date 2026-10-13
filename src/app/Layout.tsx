import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { SmoothScroll } from './SmoothScroll';
import { RouteTransitions } from './RouteTransitions';
import { Cursor } from '@/components/ui/Cursor';

export const Layout: React.FC = () => {
  return (
    <SmoothScroll>
      {/* Film Grain Noise Background (CSS Only, Cheap) */}
      <div className="bg-grain" aria-hidden="true" />

      {/* Global Ambient Gradient Mesh */}
      <div className="ambient-mesh fixed inset-0 z-0" aria-hidden="true" />

      {/* Custom Desktop Cursor */}
      <Cursor />

      <div className="relative z-10 min-h-screen flex flex-col justify-between selection:bg-accent/25 selection:text-accent">
        <Navbar />

        <main id="main-content" role="main" className="flex-1 flex flex-col pt-20">
          <RouteTransitions>
            <Outlet />
          </RouteTransitions>
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
};
