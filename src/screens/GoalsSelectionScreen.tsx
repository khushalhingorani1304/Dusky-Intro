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
    <div className="flex flex-col items-center min-h-screen bg-dusky-flow">
      <div className="w-full flex justify-center pt-8 pb-[1.6rem]">
        <div className="flex gap-[0.4rem]" style={{ width: '50%', maxWidth: '25.2rem' }}>
          {Array.from({ length: progressTotal }).map((_, index) => (
            <div
              key={index}
              className={`h-[0.3rem] flex-1 rounded-full ${
                index < progressActive ? 'bg-purple-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="w-full max-w-5xl rounded-[32px] bg-white p-8 shadow-xl shadow-purple-100">
        <button onClick={onBack} className="text-sm font-medium text-purple-500 hover:text-purple-700">
          ← Back
        </button>

        <div className="mt-6 text-center space-y-3">
          <h1 className="text-3xl font-bold text-gray-900">What do you plan to do with Dusky?</h1>
          <p className="text-sm text-gray-500">Select all that apply so we can personalize your workspace.</p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {GOAL_OPTIONS.map((option) => {
            const isSelected = selectedGoals.includes(option.id);
            return (
              <button
                key={option.id}
                onClick={() => onToggle(option.id)}
                className={`relative rounded-3xl border-2 p-6 text-left transition hover:-translate-y-1 hover:shadow-lg ${
                  isSelected ? 'border-purple-500 bg-purple-50 shadow-md' : 'border-gray-200 bg-white shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{option.icon}</span>
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-md border text-xs font-bold ${
                      isSelected ? 'border-purple-600 bg-purple-600 text-white' : 'border-gray-300 bg-white text-gray-400'
                    }`}
                  >
                    {isSelected ? '✓' : ' '}
                  </span>
                </div>
                <p className="mt-4 text-sm font-semibold text-gray-900">{option.label}</p>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <PrimaryButton onClick={() => onNext(selectedGoals)} disabled={!hasSelection} className="px-8">
            Continue
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default GoalsSelectionScreen;
