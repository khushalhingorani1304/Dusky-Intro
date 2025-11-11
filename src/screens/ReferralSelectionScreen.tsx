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
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[#F8F7FF] px-6 py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,116,255,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(45,212,191,0.08),transparent_60%)]" />
      <div className="relative w-full max-w-5xl rounded-[36px] border border-white/40 bg-white px-10 py-14 shadow-[0_28px_60px_-32px_rgba(63,55,146,0.32)]">
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
          <h1 className="text-3xl font-bold text-gray-900">How did you hear about us?</h1>
          <p className="text-sm text-gray-500">Optional (but appreciated)</p>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {REFERRAL_OPTIONS.map((option) => {
            const isSelected = selectedReferrals.includes(option.id);
            return (
              <button
                key={option.id}
                onClick={() => onToggle(option.id)}
                className={`rounded-3xl border-2 p-6 text-left transition hover:-translate-y-1 hover:shadow-lg ${
                  isSelected
                    ? 'border-[#6C4DF5] bg-[#F5F2FF] shadow-[0_20px_40px_-28px_rgba(108,77,245,0.5)]'
                    : 'border-[#E0DEF5] bg-white shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{option.icon}</span>
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-md border text-xs font-bold ${
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

        <div className="mt-12 flex justify-center">
          <PrimaryButton onClick={() => onNext(selectedReferrals)} className="px-10">
            Done
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default ReferralSelectionScreen;
