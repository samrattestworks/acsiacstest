import { useState, useEffect } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export type DeviceTier = 'high' | 'medium' | 'low' | 'none';

export interface DeviceTierResult {
  tier: DeviceTier;
  particleCount: number;
  supportsWebGL: boolean;
  maxDpr: number;
}

export function checkWebGLSupport(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export function useDeviceTier(): DeviceTierResult {
  const prefersReducedMotion = useReducedMotion();
  const [result, setResult] = useState<DeviceTierResult>(() => {
    return {
      tier: 'medium',
      particleCount: 25,
      supportsWebGL: true,
      maxDpr: 1.5,
    };
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const webglSupported = checkWebGLSupport();

    if (!webglSupported || prefersReducedMotion) {
      setResult({
        tier: 'none',
        particleCount: 0,
        supportsWebGL: webglSupported,
        maxDpr: 1,
      });
      return;
    }

    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;
    const hardwareConcurrency = navigator.hardwareConcurrency || 4;

    if (isMobile || hardwareConcurrency <= 2) {
      setResult({
        tier: 'low',
        particleCount: 16,
        supportsWebGL: true,
        maxDpr: 1.25,
      });
    } else if (isTablet || hardwareConcurrency <= 4) {
      setResult({
        tier: 'medium',
        particleCount: 28,
        supportsWebGL: true,
        maxDpr: 1.5,
      });
    } else {
      setResult({
        tier: 'high',
        particleCount: 42,
        supportsWebGL: true,
        maxDpr: 2,
      });
    }
  }, [prefersReducedMotion]);

  return result;
}
