import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Img } from '@/components/ui/Img';

describe('Img component zero CLS & fallback handling', () => {
  it('renders aspect-ratio container with provided width and height', () => {
    const { container } = render(
      <Img src="/test.jpg" alt="Test Molecule" width={400} height={300} />
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveStyle({ aspectRatio: '400 / 300' });

    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('loading', 'lazy');
    expect(img).toHaveAttribute('alt', 'Test Molecule');
  });

  it('renders fallback gracefully on image error', () => {
    render(<Img src="/nonexistent.jpg" alt="Failed Image" width={200} height={200} />);
    const img = screen.getByRole('img');
    fireEvent.error(img);

    expect(screen.getByText('Image Unavailable')).toBeInTheDocument();
  });
});
