import React, { useState } from 'react';
import { PrimaryButton } from '../components/PrimaryButton';

interface TeamSizeOption {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface TeamSizeScreenProps {
  onBack: () => void;
  onNext: (sizeId: string | null) => void;
  progressActive?: number;
  progressTotal?: number;
}

const OPTIONS: TeamSizeOption[] = [
  {
    id: 'just-me',
    label: 'Just me',
    icon: (
      <svg viewBox="0 0 64 64" className="h-12 w-12" aria-hidden="true">
        <defs>
          <linearGradient id="sproutGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A3E635" />
            <stop offset="100%" stopColor="#4ADE80" />
          </linearGradient>
        </defs>
        <path
          d="M32 36c0-8 6-14 14-14"
          stroke="#22C55E"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M32 24c0-6-5-11-11-11"
          stroke="#16A34A"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path d="M28 52h8" stroke="#15803D" strokeWidth="4" strokeLinecap="round" />
        <rect x="30" y="30" width="4" height="22" rx="2" fill="#16A34A" />
        <circle cx="46" cy="22" r="8" fill="url(#sproutGradient)" />
        <circle cx="21" cy="13" r="6" fill="url(#sproutGradient)" opacity="0.7" />
      </svg>
    ),
  },
  {
    id: '2-10',
    label: '2 – 10',
    icon: (
      <svg viewBox="0 0 64 64" className="h-12 w-12" aria-hidden="true">
        <defs>
          <linearGradient id="branchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#BBF7D0" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
        </defs>
        <path
          d="M18 44s14-16 28-18"
          stroke="#22C55E"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <circle cx="20" cy="38" r="7" fill="url(#branchGradient)" />
        <circle cx="40" cy="30" r="9" fill="url(#branchGradient)" opacity="0.9" />
        <circle cx="34" cy="20" r="5" fill="#4ADE80" />
      </svg>
    ),
  },
  {
    id: '11-50',
    label: '11 – 50',
    icon: (
      <svg viewBox="0 0 64 64" className="h-12 w-12" aria-hidden="true">
        <defs>
          <linearGradient id="treeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#86EFAC" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>
        </defs>
        <circle cx="32" cy="24" r="16" fill="url(#treeGradient)" />
        <circle cx="42" cy="32" r="10" fill="#4ADE80" opacity="0.9" />
        <rect x="28" y="38" width="8" height="18" rx="3" fill="#15803D" />
        <rect x="24" y="54" width="16" height="4" rx="2" fill="#14532D" />
      </svg>
    ),
  },
  {
    id: '51-500',
    label: '51 – 500',
    icon: (
      <svg viewBox="0 0 64 64" className="h-12 w-12" aria-hidden="true">
        <defs>
          <linearGradient id="pineGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4ADE80" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
        </defs>
        <path
          d="M32 10l14 18h-9l9 12h-8l8 12H18l8-12h-8l9-12h-9L32 10Z"
          fill="url(#pineGradient)"
        />
        <rect x="28" y="46" width="8" height="16" rx="2" fill="#047857" />
      </svg>
    ),
  },
  {
    id: '501-5000',
    label: '501 – 5000',
    icon: (
      <svg viewBox="0 0 64 64" className="h-12 w-12" aria-hidden="true">
        <defs>
          <linearGradient id="palmGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#A7F3D0" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>
        </defs>
        <path
          d="M32 28c0-10 8-18 18-18"
          stroke="#22C55E"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M32 28c0-10-8-18-18-18"
          stroke="#22C55E"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M32 28c0-10 4-18 10-18"
          stroke="#34D399"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.8"
        />
        <rect x="28" y="28" width="8" height="24" rx="3" fill="#047857" />
        <path d="M22 52h20" stroke="#0F766E" strokeWidth="4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: '5000+',
    label: '5000+',
    icon: (
      <svg viewBox="0 0 64 64" className="h-12 w-12" aria-hidden="true">
        <defs>
          <linearGradient id="landscapeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="100%" stopColor="#0EA5E9" />
          </linearGradient>
        </defs>
        <path
          d="M12 44c6-6 12-10 20-10s14 4 20 10"
          stroke="#0EA5E9"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
        <path d="M18 44h28v8H18z" fill="url(#landscapeGradient)" opacity="0.8" />
        <circle cx="22" cy="32" r="6" fill="#22C55E" />
        <circle cx="40" cy="30" r="8" fill="#0EA5E9" opacity="0.6" />
      </svg>
    ),
  },
];

const TeamSizeScreen: React.FC<TeamSizeScreenProps> = ({
  onBack,
  onNext,
  progressActive = 0,
  progressTotal = 12,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F8F7FF] py-6 px-6">
      <div className="w-full max-w-5xl rounded-[36px] border border-white/40 bg-white px-10 py-6 shadow-[0_28px_60px_-32px_rgba(63,55,146,0.32)]">
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
          <h1 className="text-3xl font-bold text-[#1A1A1A] md:text-4xl">
            How many people work at your organization?
          </h1>
          <p className="text-base text-[#6F6C8F]">
            We’ll suggest the right templates and collaboration setup.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {OPTIONS.map((option) => {
            const isSelected = selectedId === option.id;
            return (
              <button
                key={option.id}
                onClick={() => setSelectedId(option.id)}
                className={`flex items-center gap-6 rounded-[28px] border bg-white px-7 py-6 text-left transition-all duration-300 ease-out focus:outline-none focus-visible:ring-4 focus-visible:ring-[#6C4DF5]/30 ${
                  isSelected
                    ? 'border-2 border-[#6C4DF5] bg-[#F5F2FF] shadow-[0_20px_40px_-28px_rgba(108,77,245,0.6)]'
                    : 'border-[#E0DEF5] shadow-[0_18px_32px_-30px_rgba(104,97,181,0.25)] hover:border-[#6C4DF5] hover:bg-[#F8F5FF] hover:shadow-[0_24px_45px_-28px_rgba(108,77,245,0.45)]'
                }`}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-white to-[#F6F3FF] shadow-inner shadow-white/50">
                  {option.icon}
                </div>
                <div className="flex flex-1 flex-col justify-center">
                  <h3 className="text-lg font-semibold text-[#1F1B3A]">{option.label}</h3>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex justify-center">
          <PrimaryButton onClick={() => onNext(selectedId)} disabled={!selectedId} className="px-10">
            Continue
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default TeamSizeScreen;
