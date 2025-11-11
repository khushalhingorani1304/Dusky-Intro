export interface SelectOption {
  id: string;
  label: string;
  badge?: string;
}

export interface WelcomeFeatureConfig {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface WelcomeConfig {
  greeting: string;
  subheading: string;
  whatsNextTitle: string;
  whatsNextDescription: string;
  features: WelcomeFeatureConfig[];
}

export interface TeamConfig {
  title: string;
  subtitle: string;
  options: SelectOption[];
}

export interface ChallengeConfig {
  title: string;
  subtitle: string;
  options: SelectOption[];
  maxSelections: number;
}

export interface AdminConfig {
  welcome: WelcomeConfig;
  company: TeamConfig;
  challenge: ChallengeConfig;
}
