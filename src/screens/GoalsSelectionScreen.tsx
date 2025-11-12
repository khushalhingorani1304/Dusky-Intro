import React from 'react';
import { PrimaryButton } from '../components/PrimaryButton';

interface GoalOption {
  id: string;
  label: string;
  icon: string;
}

interface GoalsSelectionScreenProps {
  selectedGoals: string[];
  onToggle: (goalId: string) => void;
  onBack: () => void;
  onNext: (goals: string[]) => void;
  progressActive?: number;
  progressTotal?: number;
}

const GOAL_OPTIONS: GoalOption[] = [
  { id: 'create-presentations', label: 'Create presentations from scratch', icon: '🖥️' },
  { id: 'turn-notes', label: 'Turn my notes into presentations', icon: '📝' },
  { id: 'enhance-existing', label: 'Enhance existing decks or PDF files', icon: '📄' },
  { id: 'build-website', label: 'Build a website', icon: '🌐' },
  { id: 'social-assets', label: 'Create social media assets', icon: '📱' },
  { id: 'generate-images', label: 'Generate images with AI', icon: '✨' },
  { id: 'not-sure', label: 'Not sure yet', icon: '❓' },
];

const GoalsSelectionScreen: React.FC<GoalsSelectionScreenProps> = ({
  selectedGoals,
  onToggle,
  onBack,
  onNext,
  progressActive = 0,
  progressTotal = 12,
}) => {
  const hasSelection = selectedGoals.length > 0;

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[#F8F7FF] px-6 py-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,116,255,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(45,212,191,0.08),transparent_60%)]" />
      <div className="relative w-full max-w-5xl rounded-[36px] border border-white/40 bg-white px-10 py-6 shadow-[0_28px_60px_-32px_rgba(63,55,146,0.32)]">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-sm font-semibold text-[#6C4DF5] transition hover:text-[#4A32DD]"
          >
            ← Back
          </button>
          <span className="w-12" />
        </div>

        <div className="mt-10 text-center space-y-3">
          <h1 className="text-3xl font-bold text-gray-900">What do you plan to do with Dusky?</h1>
          <p className="text-sm text-gray-500">Select all that apply so we can personalize your workspace.</p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {GOAL_OPTIONS.map((option) => {
            const isSelected = selectedGoals.includes(option.id);
            return (
              <button
                key={option.id}
                onClick={() => onToggle(option.id)}
                className={`flex flex-col rounded-3xl border-2 p-6 text-left transition hover:-translate-y-1 hover:shadow-lg ${
                  isSelected
                    ? 'border-[#6C4DF5] bg-[#F5F2FF] shadow-[0_20px_40px_-28px_rgba(108,77,245,0.5)]'
                    : 'border-[#E0DEF5] bg-white shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-3xl">{option.icon}</span>
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-md border text-xs font-bold flex-shrink-0 ${
                      isSelected ? 'border-[#6C4DF5] bg-[#6C4DF5] text-white' : 'border-[#E0DEF5] bg-white text-[#B5B2D9]'
                    }`}
                  >
                    {isSelected ? '✓' : '+'}
                  </span>
                </div>
                <p className="mt-4 text-sm font-semibold text-gray-900">{option.label}</p>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center">
          <PrimaryButton onClick={() => onNext(selectedGoals)} disabled={!hasSelection} className="px-10">
            Continue
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default GoalsSelectionScreen;
