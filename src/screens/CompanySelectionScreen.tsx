import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { PrimaryButton } from '../components/PrimaryButton';
import type { SelectOption } from '../types/onboarding';

interface CompanySelectionScreenProps {
  title: string;
  subtitle: string;
  options: SelectOption[];
  selectedOption: string | null;
  onSelect: (optionId: string) => void;
  onNext: () => void;
  onBack: () => void;
  progressActive?: number;
  progressTotal?: number;
}

export const CompanySelectionScreen: React.FC<CompanySelectionScreenProps> = ({
  title,
  subtitle,
  options,
  selectedOption,
  onSelect,
  onNext,
  onBack,
  progressActive = 0,
  progressTotal = 12,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showError, setShowError] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const elements = [
        '.team-logo',
        '.team-heading',
        '.team-subheading',
        '.team-options',
        '.team-actions',
      ];

      gsap.fromTo(
        elements,
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSelect = (optionId: string) => {
    setShowError(false);
    onSelect(optionId);
  };

  const handleNext = () => {
    if (!selectedOption) {
      setShowError(true);
      return;
    }
    onNext();
  };

  return (
    <div ref={containerRef} className="flex flex-col items-center min-h-screen bg-dusky-flow">
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
      <div className="max-w-[50.4rem] w-full px-6 flex-1 flex items-center mt-[6rem]">
        <div className="w-full">
          <div className="flex justify-start mb-8 team-logo">
            <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center shadow-sm">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 4H24V10C24 13.3137 21.3137 16 18 16H14C10.6863 16 8 13.3137 8 10V4Z" fill="white" opacity="0.9" />
                <path d="M8 28H24V22C24 18.6863 21.3137 16 18 16H14C10.6863 16 8 18.6863 8 22V28Z" fill="white" opacity="0.9" />
                <circle cx="16" cy="16" r="2" fill="white" />
              </svg>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-2 team-heading">
            {title}
          </h2>
          <p className="text-lg text-gray-600 mb-6 team-subheading">{subtitle}</p>

          <div className="space-y-3 mb-8 team-options">
            {options.map((option) => {
              const isSelected = selectedOption === option.id;
              return (
                <button
                  key={option.id}
                  onClick={() => handleSelect(option.id)}
                  className={`w-full border rounded-lg p-3 flex items-center gap-3 transition-all text-left ${
                    isSelected
                      ? 'border-purple-500 bg-purple-50 shadow-sm'
                      : 'border-gray-300 hover:border-purple-400'
                  }`}
                >
                  {option.badge && (
                    <span
                      className={`flex h-8 w-8 items-center justify-center rounded-md border text-sm font-semibold ${
                        isSelected
                          ? 'bg-purple-600 text-white border-purple-600'
                          : 'bg-white text-purple-600 border-purple-200'
                      }`}
                    >
                      {option.badge}
                    </span>
                  )}
                  <span className="font-medium text-gray-900">{option.label}</span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center justify-between team-actions">
            <button
              onClick={onBack}
              className="text-gray-600 font-medium hover:text-gray-900 transition-colors"
            >
              Back
            </button>
            <PrimaryButton onClick={handleNext}>Next</PrimaryButton>
          </div>
          {showError && (
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
              <span>Oops! Please make a selection.</span>
            </div>
          )}
          <div className="h-4" />
          <div className="h-4" />
        </div>
      </div>
    </div>
  );
};
