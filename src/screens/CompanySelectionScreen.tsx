import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
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

const PRIORITY_IDS = ['marketing-agency', 'automation-agency'];

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

  const prioritizedOptions = useMemo(() => {
    const priorityMap = new Map(PRIORITY_IDS.map((id, index) => [id, index]));
    const priorityBucket: SelectOption[] = [];
    const remaining: SelectOption[] = [];

    options.forEach((option) => {
      const normalizedId = option.id;
      const normalizedLabel = option.label.trim().toLowerCase();
      const matchIndex =
        priorityMap.get(normalizedId) ??
        (normalizedLabel.includes('marketing') ? priorityMap.get('marketing-agency') : undefined) ??
        (normalizedLabel.includes('automation') ? priorityMap.get('automation-agency') : undefined);
      if (matchIndex !== undefined) {
        priorityBucket[matchIndex] = option;
      } else {
        remaining.push(option);
      }
    });

    return priorityBucket.filter(Boolean).concat(remaining);
  }, [options]);

  const optionIcons = useMemo<Record<string, React.ReactNode>>(
    () => ({
      'content-creation': (
        <svg viewBox="0 0 64 64" className="h-12 w-12 text-[#6C4DF5]" aria-hidden="true">
          <defs>
            <linearGradient id="companyContentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C4B5FD" />
              <stop offset="100%" stopColor="#6C4DF5" />
            </linearGradient>
          </defs>
          <rect x="10" y="14" width="44" height="36" rx="10" fill="url(#companyContentGradient)" />
          <rect x="18" y="22" width="28" height="4" rx="2" fill="#F5F3FF" />
          <rect x="18" y="30" width="20" height="4" rx="2" fill="#E9E5FF" />
          <circle cx="18" cy="40" r="4" fill="#F5F3FF" />
          <circle cx="30" cy="40" r="4" fill="#F5F3FF" opacity="0.8" />
          <circle cx="42" cy="40" r="4" fill="#F5F3FF" opacity="0.65" />
        </svg>
      ),
      'content-creation-studio': (
        <svg viewBox="0 0 64 64" className="h-12 w-12 text-[#6C4DF5]" aria-hidden="true">
          <defs>
            <linearGradient id="companyStudioGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B4C6FF" />
              <stop offset="100%" stopColor="#5470F5" />
            </linearGradient>
          </defs>
          <path
            d="M12 40h40v10a4 4 0 01-4 4H16a4 4 0 01-4-4V40Z"
            fill="url(#companyStudioGradient)"
          />
          <path
            d="M16 20l16-10 16 10v12a2 2 0 01-2 2H18a2 2 0 01-2-2V20Z"
            fill="#E7EDFF"
          />
          <rect x="24" y="30" width="16" height="10" rx="2" fill="#5470F5" opacity="0.85" />
        </svg>
      ),
      'marketing-agency': (
        <svg viewBox="0 0 64 64" className="h-12 w-12 text-[#6C4DF5]" aria-hidden="true">
          <defs>
            <linearGradient id="companyMarketingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFC8A2" />
              <stop offset="100%" stopColor="#FF8A5B" />
            </linearGradient>
          </defs>
          <path
            d="M14 30l26-12v28L14 34V30Z"
            fill="url(#companyMarketingGradient)"
            stroke="#FF8A5B"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M40 22l8-4v28l-8-4"
            stroke="#FF8A5B"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.7"
          />
          <circle cx="20" cy="44" r="4" fill="#FF8A5B" opacity="0.7" />
        </svg>
      ),
      'advertising-agency': (
        <svg viewBox="0 0 64 64" className="h-12 w-12 text-[#6C4DF5]" aria-hidden="true">
          <defs>
            <linearGradient id="companyAdvertisingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFB6C1" />
              <stop offset="100%" stopColor="#FF5A7E" />
            </linearGradient>
          </defs>
          <rect x="16" y="16" width="32" height="32" rx="8" fill="url(#companyAdvertisingGradient)" />
          <path
            d="M24 24h16v6l-4 4 4 4v6H24l4-4-4-4v-6l4-4-4-4Z"
            fill="#FFE5EC"
          />
        </svg>
      ),
      'automation-agency': (
        <svg viewBox="0 0 64 64" className="h-12 w-12 text-[#6C4DF5]" aria-hidden="true">
          <rect x="14" y="16" width="36" height="32" rx="10" fill="#D1FAE5" />
          <rect x="22" y="24" width="20" height="16" rx="4" fill="#34D399" opacity="0.8" />
          <path
            d="M24 16v-4h16v4"
            stroke="#34D399"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d="M14 26H8m48 0h-6"
            stroke="#10B981"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      ),
      saas: (
        <svg viewBox="0 0 64 64" className="h-12 w-12 text-[#6C4DF5]" aria-hidden="true">
          <defs>
            <linearGradient id="companySaasGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#93C5FD" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
          <path
            d="M16 34c-4 0-7 3-7 7s3 7 7 7h32c4.418 0 8-3.582 8-8 0-3.89-2.79-7.127-6.482-7.86C47.47 24.99 41.36 20 34 20c-6.08 0-11.32 3.6-13.76 8.8C19.53 28.3 18.8 28 18 28c-4.418 0-8 3.582-8 8Z"
            fill="url(#companySaasGradient)"
          />
          <rect x="24" y="34" width="16" height="10" rx="5" fill="#1D4ED8" opacity="0.6" />
        </svg>
      ),
      ecommerce: (
        <svg viewBox="0 0 64 64" className="h-12 w-12 text-[#6C4DF5]" aria-hidden="true">
          <defs>
            <linearGradient id="companyEcomGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FBCFE8" />
              <stop offset="100%" stopColor="#F472B6" />
            </linearGradient>
          </defs>
          <path
            d="M16 20h32l-4 22H20l-4-22Z"
            fill="url(#companyEcomGradient)"
            stroke="#F472B6"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M24 44v4m16-4v4"
            stroke="#F472B6"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx="24" cy="50" r="3" fill="#F472B6" />
          <circle cx="40" cy="50" r="3" fill="#F472B6" />
        </svg>
      ),
      education: (
        <svg viewBox="0 0 64 64" className="h-12 w-12 text-[#6C4DF5]" aria-hidden="true">
          <defs>
            <linearGradient id="companyEducationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
          <path
            d="M12 28l20-12 20 12-20 12-20-12Z"
            fill="url(#companyEducationGradient)"
          />
          <path
            d="M22 34v10c0 3.314 4.477 6 10 6s10-2.686 10-6V34"
            stroke="#F59E0B"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>
      ),
      'company-other': (
        <svg viewBox="0 0 64 64" className="h-12 w-12 text-[#6C4DF5]" aria-hidden="true">
          <rect x="16" y="20" width="32" height="24" rx="12" fill="#E0E7FF" />
          <circle cx="24" cy="32" r="6" fill="#6366F1" />
          <circle cx="40" cy="32" r="6" fill="#6366F1" opacity="0.7" />
          <path
            d="M24 26l12-6"
            stroke="#818CF8"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>
      ),
    }),
    []
  );

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const elements = [
        '.company-progress',
        '.company-header',
        '.company-grid',
        '.company-actions',
        '.company-error',
      ];

      gsap.fromTo(
        elements,
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power3.out' }
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
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[#F8F7FF] px-6 py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,116,255,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(45,212,191,0.1),transparent_60%)]" />
      <div
        ref={containerRef}
        className="relative w-full max-w-5xl rounded-[36px] border border-white/45 bg-white/90 px-10 py-14 shadow-[0_30px_70px_-32px_rgba(63,55,146,0.32)] backdrop-blur-2xl md:px-16"
      >
        <div className="company-progress flex items-center justify-between">
          <button
            onClick={onBack}
            className="text-sm font-semibold text-[#6C4DF5] transition hover:text-[#4A32DD]"
          >
            ← Back
          </button>
          <span className="w-12" />
        </div>

        <div className="company-header mt-10 text-center space-y-3">
          <h2 className="text-3xl font-bold text-[#1A1A1A] md:text-4xl">{title}</h2>
          <p className="text-base text-[#6F6C8F]">{subtitle}</p>
        </div>

        <div className="company-grid mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {prioritizedOptions.map((option) => {
            const isSelected = selectedOption === option.id;
            const borderStyles = isSelected
              ? 'border-2 border-[#6C4DF5]'
              : 'border border-[#E0DEF5]';
            const shadowStyles = isSelected
              ? 'shadow-[0_22px_44px_-26px_rgba(108,77,245,0.6)]'
              : 'shadow-[0_18px_38px_-30px_rgba(104,97,181,0.28)]';

            return (
              <button
                key={option.id}
                onClick={() => handleSelect(option.id)}
                className={`group flex flex-col items-center rounded-[28px] bg-white/90 px-8 py-8 text-center transition-all duration-300 ease-out focus:outline-none focus-visible:ring-4 focus-visible:ring-[#6C4DF5]/35 ${borderStyles} ${shadowStyles} hover:-translate-y-1 hover:border-[#6C4DF5] hover:shadow-[0_26px_52px_-30px_rgba(108,77,245,0.55)]`}
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F2F0FF] text-[#6C4DF5]">
                  {optionIcons[option.id] ?? (
                    <svg viewBox="0 0 24 24" className="h-7 w-7" fill="currentColor" aria-hidden="true">
                      <path d="M12 2a7 7 0 0 1 7 7c0 4.35-4.26 9.22-6 10.94a1.5 1.5 0 0 1-2 0C9.26 18.22 5 13.35 5 9a7 7 0 0 1 7-7Zm0 9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                    </svg>
                  )}
                </div>
                <h3 className="mt-7 text-lg font-semibold text-[#1F1B3A]">{option.label}</h3>
              </button>
            );
          })}
        </div>

        <div className="company-actions mt-12 flex justify-center">
          <PrimaryButton onClick={handleNext} className="px-10" disabled={!selectedOption}>
            Next
          </PrimaryButton>
        </div>
        {showError && (
          <div className="company-error mt-4 flex justify-center">
            <div className="flex items-center gap-2 rounded-lg bg-red-50 px-4 py-2 text-sm font-medium text-red-600">
              <span>Oops! Please make a selection.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
