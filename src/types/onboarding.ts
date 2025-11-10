export interface SelectOption {
  id: string;
  label: string;
  badge?: string;
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
  company: TeamConfig;
  challenge: ChallengeConfig;
}
