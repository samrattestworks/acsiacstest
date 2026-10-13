import { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { LogoPlaceholder } from '@/components/ui/LogoPlaceholder';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('[ErrorBoundary caught error]', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 text-center select-none">
          <div className="max-w-md w-full p-8 rounded-2xl border border-border bg-surface/90 backdrop-blur-xl shadow-card flex flex-col items-center gap-6">
            <LogoPlaceholder />
            <div className="w-12 h-12 rounded-xl bg-destructive/10 text-destructive border border-destructive/20 flex items-center justify-center font-mono font-bold text-lg">
              !
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="font-display text-2xl font-bold">Molecular State Desynchronized</h1>
              <p className="text-sm text-muted">
                An unexpected runtime condition occurred. The chapter portal was isolated to prevent
                state corruption.
              </p>
            </div>
            <Button
              variant="primary"
              onClick={() => {
                this.setState({ hasError: false, error: null });
                window.location.reload();
              }}
            >
              Reinitialize Portal
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
