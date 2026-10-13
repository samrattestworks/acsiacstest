import React, { useState } from 'react';
import { cn } from '@/lib/cn';

export interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  priority?: boolean;
}

/**
 * Universal Img component strictly enforcing width, height, aspect-ratio container
 * to eliminate Cumulative Layout Shift (CLS < 0.02), with blur-up placeholder and lazy loading.
 */
export const Img: React.FC<ImgProps> = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  ...rest
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const aspectRatio = `${width} / ${height}`;

  return (
    <div
      className={cn('relative overflow-hidden bg-surface/50 select-none', className)}
      style={{ aspectRatio }}
    >
      {/* Blur-up placeholder skeleton */}
      {!isLoaded && !hasError && (
        <div
          className="absolute inset-0 bg-gradient-to-tr from-surface to-surface-hover animate-pulse"
          aria-hidden="true"
        />
      )}

      {/* Main Image */}
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={cn(
            'w-full h-full object-cover transition-opacity duration-500 ease-out',
            isLoaded ? 'opacity-100' : 'opacity-0'
          )}
          {...rest}
        />
      ) : (
        <div
          className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-surface/80 text-muted border border-dashed border-border"
          role="img"
          aria-label={alt}
        >
          <span className="text-xs font-mono uppercase tracking-wider">Image Unavailable</span>
          <span className="text-[11px] text-muted/80 mt-1 line-clamp-1">{alt}</span>
        </div>
      )}
    </div>
  );
};
