import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { AdminConfig, TeamConfig, ChallengeConfig, WelcomeConfig } from '../types/onboarding';

const DEFAULT_CONFIG: AdminConfig = {
  welcome: {
    greeting: "Hey there! I'm Dusky.",
    subheading: "I'm your new AI content assistant. I'm here to help you create, research, and brainstorm amazing content, faster than ever.",
    whatsNextTitle: "What’s next",
    whatsNextDescription: "We’ll gather a few quick details to personalize your workspace, then spin up your first canvas.",
    features: [
      {
        id: 'feature-content',
        title: 'Content Creation',
        description: 'Generate social posts, scripts, long-form articles, and more in minutes.',
        icon: 'document-text',
      },
      {
        id: 'feature-research',
        title: 'Deep Research',
        description: 'Surface the latest insights, organize sources, and summarize findings instantly.',
        icon: 'magnifying-glass',
      },
    ],
  },
  company: {
    title: 'What best describes your company?',
    subtitle: 'This helps us customize your experience in Dusky.',
    options: [
      { id: 'content-creation', label: 'Content creation studio', badge: 'A' },
      { id: 'marketing-agency', label: 'Marketing agency/ Advertising agency', badge: 'B' },
      { id: 'advertising-agency', label: 'Advertising agency', badge: 'C' },
      { id: 'automation-agency', label: 'Automation agency', badge: 'D' },
      { id: 'saas', label: 'Software as a service', badge: 'E' },
      { id: 'ecommerce', label: 'Ecommerce', badge: 'F' },
      { id: 'education', label: 'Education', badge: 'G' },
      { id: 'company-other', label: 'Other', badge: 'H' },
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
  updateWelcomeConfig: (config: WelcomeConfig) => void;
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
        const parsed = JSON.parse(stored) as Partial<AdminConfig>;
        return {
          ...DEFAULT_CONFIG,
          ...parsed,
          welcome: { ...DEFAULT_CONFIG.welcome, ...(parsed?.welcome ?? {}) },
          company: { ...DEFAULT_CONFIG.company, ...(parsed?.company ?? {}) },
          challenge: { ...DEFAULT_CONFIG.challenge, ...(parsed?.challenge ?? {}) },
        };
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
      updateWelcomeConfig: (welcomeConfig) => setConfig((prev) => ({ ...prev, welcome: welcomeConfig })),
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
