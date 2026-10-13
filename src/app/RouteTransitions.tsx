import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { scrollToElement } from '@/lib/navigation';

export interface RouteTransitionsProps {
  children: React.ReactNode;
}

export const RouteTransitions: React.FC<RouteTransitionsProps> = ({ children }) => {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  // Scroll handler: if hash exists, scroll to element; otherwise, scroll to top
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace('#', '');
      scrollToElement(sectionId);
      const timer = setTimeout(() => {
        scrollToElement(sectionId);
      }, 350);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [location.pathname, location.hash]);

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{
          duration: 0.32,
          ease: [0.22, 1, 0.36, 1], // Requested easing curve
        }}
        className="w-full flex-1 flex flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
