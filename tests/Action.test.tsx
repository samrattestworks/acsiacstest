import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Action } from '@/sections/Action';
import { siteConfig } from '@/content/site';

describe('Action panel registration toggle logic', () => {
  it('renders closed state with disabled button when registration.open is false', () => {
    siteConfig.registration.open = false;
    render(<Action />);

    const closedElements = screen.getAllByText('Registrations Closed');
    expect(closedElements.length).toBeGreaterThanOrEqual(1);
    const closedButton = screen.getByRole('button', { name: 'Registrations Closed' });
    expect(closedButton).toBeDisabled();
    expect(screen.getByText(/Follow us for upcoming announcements/i)).toBeInTheDocument();
  });

  it('renders open state with active registration link when registration.open is true', () => {
    siteConfig.registration.open = true;
    render(<Action />);

    expect(screen.getByText('Registrations Open')).toBeInTheDocument();
    const openLink = screen.getByRole('link', { name: /Complete Registration/i });
    expect(openLink).toBeInTheDocument();
    expect(openLink).toHaveAttribute('href', siteConfig.links.registration);

    // Reset back to default
    siteConfig.registration.open = false;
  });
});
