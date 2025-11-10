import React from 'react';
import { PrimaryButton } from '../components/PrimaryButton';

interface ReferralOption {
  id: string;
  label: string;
  icon: string;
}

interface ReferralSelectionScreenProps {
  selectedReferrals: string[];
  onToggle: (referralId: string) => void;
  onBack: () => void;
  onNext: (referrals: string[]) => void;
  progressActive?: number;
  progressTotal?: number;
}

const REFERRAL_OPTIONS: ReferralOption[] = [
  { id: 'friend', label: 'Friend or colleague', icon: '💬' },
  { id: 'newsletter', label: 'Newsletter, blog, or podcast', icon: '📰' },
  { id: 'search', label: 'Google or other search', icon: '🔍' },
  { id: 'tiktok', label: 'TikTok', icon: '🎵' },
  { id: 'social', label: 'Instagram or Facebook', icon: '📱' },
  { id: 'youtube', label: 'YouTube', icon: '▶️' },
  { id: 'linkedin', label: 'LinkedIn', icon: '🔗' },
  { id: 'twitter', label: 'Twitter/X', icon: '✖️' },
  { id: 'ai-tool', label: 'AI tool', icon: '✨' },
  { id: 'other', label: 'Other', icon: '…' },
];

const ReferralSelectionScreen: React.FC<ReferralSelectionScreenProps> = ({
  selectedReferrals,
  onToggle,
  onBack,
  onNext,
  progressActive = 0,
  progressTotal = 12,
}) => {
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
          <h1 className="text-3xl font-bold text-gray-900">How did you hear about us?</h1>
          <p className="text-sm text-gray-500">Optional (but appreciated)</p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {REFERRAL_OPTIONS.map((option) => {
            const isSelected = selectedReferrals.includes(option.id);
            return (
              <button
                key={option.id}
                onClick={() => onToggle(option.id)}
                className={`rounded-3xl border-2 p-6 text-left transition hover:-translate-y-1 hover:shadow-lg ${
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
          <PrimaryButton onClick={() => onNext(selectedReferrals)} className="px-8">
            Done
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default ReferralSelectionScreen;
