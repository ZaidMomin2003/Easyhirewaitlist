'use client';

import { useState } from 'react';
import { ResultsLoginForm } from '@/components/results-login-form';
import { ResultsDashboard } from '@/components/results-dashboard';

export default function ResultsPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="container mx-auto p-4 md:p-8">
        {!isLoggedIn ? (
          <ResultsLoginForm onLoginSuccess={handleLoginSuccess} />
        ) : (
          <ResultsDashboard />
        )}
      </div>
    </div>
  );
}
