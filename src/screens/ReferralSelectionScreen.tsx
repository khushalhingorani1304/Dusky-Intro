import React from 'react';
import { PrimaryButton } from '../components/PrimaryButton';

// Import icon images
import InstaFacebookIcon from '../../Icons/Insta&Facebook.png';
import YtIcon from '../../Icons/Yt.png';
import GoogleIcon from '../../Icons/Google.png';
import LinkedinIcon from '../../Icons/Linkedin.png';
import TiktokIcon from '../../Icons/Tiktok.png';
import TwitterIcon from '../../Icons/Twitter.png';
import FriendsIcon from '../../Icons/Friends.png';

interface ReferralOption {
  id: string;
  label: string;
  icon: string | React.ReactNode;
}

interface ReferralSelectionScreenProps {
  selectedReferrals: string[];
  onToggle: (referralId: string) => void;
  onBack: () => void;
  onNext: (referrals: string[]) => void;
  progressActive?: number;
  progressTotal?: number;
}

const ReferralSelectionScreen: React.FC<ReferralSelectionScreenProps> = ({
  selectedReferrals,
  onToggle,
  onBack,
  onNext,
  progressActive = 0,
  progressTotal = 12,
}) => {
  const REFERRAL_OPTIONS: ReferralOption[] = [
    { id: 'friend', label: 'Friend or colleague', icon: <img src={FriendsIcon} alt="Friends" className="h-8 w-8 object-contain" />},
    { id: 'social', label: 'Instagram or Facebook', icon: <img src={InstaFacebookIcon} alt="Instagram/Facebook" className="h-8 w-8 object-contain" /> },
    { id: 'youtube', label: 'YouTube', icon: <img src={YtIcon} alt="YouTube" className="h-8 w-8 object-contain" /> },
    { id: 'tiktok', label: 'TikTok', icon: <img src={TiktokIcon} alt="TikTok" className="h-8 w-8 object-contain" /> },
    { id: 'search', label: 'Google or other search', icon: <img src={GoogleIcon} alt="Google" className="h-8 w-8 object-contain" /> },
    { id: 'linkedin', label: 'LinkedIn', icon: <img src={LinkedinIcon} alt="LinkedIn" className="h-8 w-8 object-contain" /> },
    { id: 'twitter', label: 'Twitter/X', icon: <img src={TwitterIcon} alt="Twitter" className="h-8 w-8 object-contain" />  },
    { id: 'ai-tool', label: 'AI tool', icon: '✨' },
    { id: 'other', label: 'Other', icon: '…' },
  ];
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
                  <span className={`flex items-center justify-center ${typeof option.icon === 'string' ? 'text-3xl' : ''}`}>
                    {option.icon}
                  </span>
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

        <div className="mt-6 flex justify-center">
          <PrimaryButton onClick={() => onNext(selectedReferrals)} className="px-10">
            Done
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default ReferralSelectionScreen;
