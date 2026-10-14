import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './Layout';
import { ErrorBoundary } from './ErrorBoundary';

// Lazy load route pages for optimal initial chunk size (<150KB gzip)
const Home = lazy(() => import('@/pages/Home'));
const About = lazy(() => import('@/pages/About'));
const Team = lazy(() => import('@/pages/Team'));
const Join = lazy(() => import('@/pages/Join'));
const Events = lazy(() => import('@/pages/Events'));
const Register = lazy(() => import('@/pages/Register'));
const NotFound = lazy(() => import('@/pages/NotFound').then((m) => ({ default: m.NotFound })));

const RouteLoading: React.FC = () => (
  <div
    className="min-h-[60vh] flex items-center justify-center select-none"
    aria-label="Loading page"
  >
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 rounded-full border-2 border-accent border-t-transparent animate-spin" />
      <span className="font-mono text-xs text-muted tracking-wider uppercase">Loading...</span>
    </div>
  </div>
);

export const AppRouter: React.FC = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <Suspense fallback={<RouteLoading />}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="about"
              element={
                <Suspense fallback={<RouteLoading />}>
                  <About />
                </Suspense>
              }
            />
            <Route
              path="team"
              element={
                <Suspense fallback={<RouteLoading />}>
                  <Team />
                </Suspense>
              }
            />
            <Route
              path="join"
              element={
                <Suspense fallback={<RouteLoading />}>
                  <Join />
                </Suspense>
              }
            />
            <Route
              path="events"
              element={
                <Suspense fallback={<RouteLoading />}>
                  <Events />
                </Suspense>
              }
            />
            <Route
              path="register"
              element={
                <Suspense fallback={<RouteLoading />}>
                  <Register />
                </Suspense>
              }
            />
            <Route
              path="*"
              element={
                <Suspense fallback={<RouteLoading />}>
                  <NotFound />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
};
