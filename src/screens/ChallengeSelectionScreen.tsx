import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { PrimaryButton } from '../components/PrimaryButton';
import gsap from 'gsap';
import type { SelectOption } from '../types/onboarding';

interface ChallengeSelectionScreenProps {
  title: string;
  subtitle: string;
  options: SelectOption[];
  maxSelections: number;
  onNext: (challenges: string[]) => void;
  progressActive?: number;
  progressTotal?: number;
}

export const ChallengeSelectionScreen: React.FC<ChallengeSelectionScreenProps> = ({
  title,
  subtitle,
  options,
  maxSelections,
  onNext,
  progressActive = 0,
  progressTotal = 12,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedChallenges, setSelectedChallenges] = useState<string[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const elements = [
        '.challenge-progress',
        '.challenge-header',
        '.challenge-grid',
        '.challenge-actions',
      ];

      gsap.fromTo(
        elements,
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleToggleChallenge = (challenge: string) => {
    if (selectedChallenges.includes(challenge)) {
      setSelectedChallenges(selectedChallenges.filter((c) => c !== challenge));
    } else if (selectedChallenges.length < maxSelections) {
      setSelectedChallenges([...selectedChallenges, challenge]);
    }
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[#F8F7FF] px-6 py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,116,255,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(45,212,191,0.08),transparent_60%)]" />
      <div
        ref={containerRef}
        className="relative w-full max-w-5xl rounded-[36px] border border-white/45 bg-white/90 px-10 py-14 shadow-[0_30px_70px_-32px_rgba(63,55,146,0.32)] backdrop-blur-2xl md:px-16"
      >
        <div className="challenge-progress flex items-center justify-between">
          <span className="w-12" />
          <span className="w-12" />
        </div>

        <div className="challenge-header mt-10 text-center space-y-3">
          <h2 className="text-3xl font-bold text-[#1A1A1A] md:text-4xl">{title}</h2>
          <p className="text-base text-[#6F6C8F]">{subtitle}</p>
        </div>

        <div className="challenge-grid mt-12 grid gap-4 md:grid-cols-2">
          {options.map((challenge) => {
            const isSelected = selectedChallenges.includes(challenge.id);
            return (
              <button
                key={challenge.id}
                type="button"
                onClick={() => handleToggleChallenge(challenge.id)}
                className={`group flex items-center justify-between rounded-[24px] border bg-white/90 px-6 py-5 text-left text-base font-semibold text-[#1F1B3A] transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#6C4DF5]/35 ${
                  isSelected
                    ? 'border-2 border-[#6C4DF5] shadow-[0_22px_44px_-28px_rgba(108,77,245,0.6)]'
                    : 'border-[#E0DEF5] shadow-[0_20px_40px_-30px_rgba(104,97,181,0.25)] hover:-translate-y-1 hover:border-[#6C4DF5] hover:shadow-[0_26px_56px_-32px_rgba(108,77,245,0.55)]'
                }`}
              >
                <span>{challenge.label}</span>
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-full text-sm font-semibold ${
                    isSelected ? 'bg-[#6C4DF5] text-white' : 'bg-[#F2F0FF] text-[#6C4DF5]'
                  }`}
                >
                  {isSelected ? '✓' : '+'}
                </span>
              </button>
            );
          })}
        </div>

        <div className="challenge-actions mt-12 flex justify-center">
          <PrimaryButton
            onClick={() => onNext(selectedChallenges)}
            disabled={selectedChallenges.length === 0}
            className="px-10"
          >
            Next
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};
