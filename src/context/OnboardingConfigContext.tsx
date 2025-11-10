import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { AdminConfig, TeamConfig, ChallengeConfig } from '../types/onboarding';

const DEFAULT_CONFIG: AdminConfig = {
  company: {
    title: 'What best describes your company?',
    subtitle: 'This helps us customize your experience in Dusky.',
    options: [
      { id: 'automation-agency', label: 'Automation agency', badge: 'A' },
      { id: 'marketing-consultancy', label: 'Marketing agency/consultancy', badge: 'B' },
      { id: 'saas', label: 'Software as a service', badge: 'C' },
      { id: 'ecommerce', label: 'Ecommerce', badge: 'D' },
      { id: 'education', label: 'Education', badge: 'E' },
      { id: 'company-other', label: 'Other', badge: 'F' },
    ],
  },
  challenge: {
    title: "What's your biggest challenge right now?",
    subtitle: 'Pick up to 3 that best describe your current challenge with content creation.',
    options: [
      { id: 'challenge-creation-time', label: 'Content takes too long to create' },
      { id: 'challenge-performance', label: "Content doesn't perform well" },
      { id: 'challenge-context-switching', label: 'Too much context switching' },
      { id: 'challenge-scattered', label: 'My sources are scattered' },
      { id: 'challenge-generic', label: 'Content feels generic' },
    ],
    maxSelections: 3,
  },
};

interface OnboardingConfigContextValue {
  config: AdminConfig;
  updateCompanyConfig: (config: TeamConfig) => void;
  updateChallengeConfig: (config: ChallengeConfig) => void;
  resetConfig: () => void;
}

const OnboardingConfigContext = createContext<OnboardingConfigContextValue | undefined>(undefined);
const STORAGE_KEY = 'onboarding_config';

export const OnboardingConfigProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [config, setConfig] = useState<AdminConfig>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored) as AdminConfig;
      } catch (error) {
        console.warn('Failed to parse onboarding config from storage', error);
      }
    }
    return DEFAULT_CONFIG;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  }, [config]);

  const value = useMemo<OnboardingConfigContextValue>(
    () => ({
      config,
      updateCompanyConfig: (companyConfig) => setConfig((prev) => ({ ...prev, company: companyConfig })),
      updateChallengeConfig: (challengeConfig) => setConfig((prev) => ({ ...prev, challenge: challengeConfig })),
      resetConfig: () => setConfig(DEFAULT_CONFIG),
    }),
    [config]
  );

  return (
    <OnboardingConfigContext.Provider value={value}>{children}</OnboardingConfigContext.Provider>
  );
};

export const useOnboardingConfig = (): OnboardingConfigContextValue => {
  const context = useContext(OnboardingConfigContext);
  if (!context) {
    throw new Error('useOnboardingConfig must be used within an OnboardingConfigProvider');
  }
  return context;
};
