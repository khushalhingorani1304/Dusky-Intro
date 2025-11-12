import React, { useState } from 'react';

interface IntentOption {
  id: string;
  title: string;
  illustration: React.ReactNode;
}

interface IntentSelectionScreenProps {
  onSelect: (intentId: string) => void;
  onNext: (intentId: string | null) => void;
  progressActive?: number;
  progressTotal?: number;
  userName?: string;
}

const OPTIONS: IntentOption[] = [
  {
    id: 'personal',
    title: 'For personal use',
    illustration: (
      <svg
        viewBox="0 0 240 240"
        className="h-32 w-32 text-[#4A6FF1]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="personalFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8DA6FF" />
            <stop offset="100%" stopColor="#4A6FF1" />
          </linearGradient>
        </defs>
        <g fill="url(#personalFill)" stroke="none">
          <rect x="80" y="115" width="80" height="55" rx="20" />
          <rect x="90" y="100" width="60" height="40" rx="18" />
          <rect x="98" y="165" width="12" height="26" rx="6" />
          <rect x="130" y="165" width="12" height="26" rx="6" />
        </g>
        <rect
          x="76"
          y="140"
          width="88"
          height="14"
          rx="7"
          fill="#3D56CF"
          opacity="0.18"
        />
      </svg>
    ),
  },
  {
    id: 'work',
    title: 'For work',
    illustration: (
      <svg
        viewBox="0 0 240 240"
        className="h-32 w-32 text-[#4A6FF1]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="workFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9AB5FF" />
            <stop offset="100%" stopColor="#476CF1" />
          </linearGradient>
        </defs>
        <rect x="70" y="90" width="100" height="70" rx="16" fill="url(#workFill)" />
        <rect x="82" y="104" width="76" height="42" rx="12" fill="#E9EEFF" opacity="0.9" />
        <rect x="102" y="164" width="36" height="8" rx="4" fill="#2D4FCC" opacity="0.5" />
        <rect x="110" y="172" width="20" height="18" rx="4" fill="#2D4FCC" opacity="0.65" />
      </svg>
    ),
  },
  {
    id: 'education',
    title: 'For education',
    illustration: (
      <svg
        viewBox="0 0 240 240"
        className="h-32 w-32 text-[#4A6FF1]"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="educationFill" x1="40%" y1="0%" x2="60%" y2="100%">
            <stop offset="0%" stopColor="#A3BCFF" />
            <stop offset="100%" stopColor="#385DEB" />
          </linearGradient>
        </defs>
        <rect x="102" y="90" width="36" height="88" rx="12" fill="url(#educationFill)" />
        <rect x="110" y="98" width="20" height="64" rx="6" fill="#F0F4FF" opacity="0.9" />
        <circle cx="120" cy="182" r="7" fill="#2F4FCC" opacity="0.6" />
      </svg>
    ),
  },
];

const IntentSelectionScreen: React.FC<IntentSelectionScreenProps> = ({
  onSelect,
  onNext,
  progressActive = 0,
  progressTotal = 12,
  userName,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setSelectedId(id);
    onSelect(id);
    window.requestAnimationFrame(() => {
      setTimeout(() => onNext(id), 220);
    });
  };

  const displayName = userName?.trim();
  const heading = displayName
    ? `${displayName}, how do you plan to use Dusky?`
    : 'How do you plan to use Dusky?';

  return (
    <div className="relative flex min-h-screen w-full items-start justify-center bg-[#F6F7FB] py-20 px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(56,189,248,0.08),transparent_55%)]" />
      <div className="relative w-full max-w-6xl rounded-[32px] border border-white/40 bg-white/80 px-8 py-14 shadow-[0_28px_65px_-30px_rgba(15,23,42,0.35)] backdrop-blur-2xl md:px-16">
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-bold tracking-tight text-[#1A1A1A] md:text-4xl">
            {heading}
          </h1>
          <p className="text-base text-[#6A6A6A]">
            We use your answers to personalize your experience.
          </p>
        </div>
        <div className="mt-8 grid gap-10 md:grid-cols-3">
          {OPTIONS.map((option) => {
            const isSelected = selectedId === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelect(option.id)}
                className={`group relative flex flex-col items-center h-120 overflow-hidden rounded-[28px] border bg-white/60 p-10 shadow-[0px_10px_30px_rgba(15,23,42,0.07)] backdrop-blur-xl transition-all duration-300 ease-out focus:outline-none focus:ring-4 focus:ring-white/30 ${
                  isSelected
                    ? 'border-2 border-white/80 shadow-[0_18px_55px_-20px_rgba(108,77,245,0.6)]'
                    : 'border border-white/30 hover:border-white/70 hover:shadow-[0_20px_45px_-25px_rgba(108,77,245,0.5)]'
                }`}
              >
                <div className="relative flex w-full justify-center">
                  <div className="absolute top-10 h-36 w-36 rounded-full bg-white/40 blur-3xl" />
                  <div className="relative flex items-center justify-center rounded-[24px] bg-white/70 p-6 shadow-[0_18px_30px_-18px_rgba(99,102,241,0.45)] backdrop-blur-lg">
                    {option.illustration}
                  </div>
                </div>
                <div className="mt-4 mb-2 text-center">
                  <h3 className="text-lg font-semibold text-[#1A1A1A] md:text-xl">
                    {option.title}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default IntentSelectionScreen;
