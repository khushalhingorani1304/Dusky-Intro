import React, { useState } from 'react';
import { PrimaryButton } from '../components/PrimaryButton';

export interface EducationRoleOption {
  id: string;
  label?: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface EducationRoleSelectionScreenProps {
  title: string;
  subtitle?: string;
  options: EducationRoleOption[];
  onBack: () => void;
  onNext: (roleId: string | null) => void;
  progressActive?: number;
  progressTotal?: number;
}

const EducationRoleSelectionScreen: React.FC<EducationRoleSelectionScreenProps> = ({
  title,
  subtitle,
  options,
  onBack,
  onNext,
  progressActive = 0,
  progressTotal = 12,
}) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (option: EducationRoleOption) => {
    if (option.disabled) return;
    setSelectedId(option.id);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-[#F8F7FF] py-20 px-6">
      <div className="w-full max-w-5xl rounded-[36px] border border-white/40 bg-white px-10 py-14 shadow-[0_28px_60px_-32px_rgba(63,55,146,0.32)]">
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
          <h1 className="text-3xl font-bold text-[#1A1A1A] md:text-4xl">{title}</h1>
          {subtitle && <p className="text-base text-[#6F6C8F]">{subtitle}</p>}
        </div>

       <div className="mt-12 flex flex-wrap gap-6 md:justify-between lg:justify-center lg:gap-24">

          {options.map((option) => {
            const isSelected = selectedId === option.id;
            const borderStyles = isSelected
              ? 'border-2 border-[#6C4DF5]'
              : 'border border-[#E0DEF5]';
            const shadowStyles = isSelected
              ? 'shadow-[0_20px_40px_-24px_rgba(108,77,245,0.65)]'
              : 'shadow-[0_18px_35px_-28px_rgba(104,97,181,0.28)]';
            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelect(option)}
                disabled={option.disabled}
                className={`group flex flex-col items-center rounded-[28px] w-64 bg-white p-8 text-center transition-all duration-300 ease-out focus:outline-none focus-visible:ring-4 focus-visible:ring-[#6C4DF5]/40 ${
                  option.disabled ? '' : 'hover:-translate-y-1'
                } ${borderStyles} ${shadowStyles} ${
                  option.disabled
                    ? 'cursor-default opacity-70'
                    : 'hover:border-[#6C4DF5] hover:shadow-[0_24px_48px_-28px_rgba(108,77,245,0.55)]'
                }`}
              >
                {option.icon && (
                  <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-white to-[#F3F1FF] shadow-inner shadow-white/40">
                    {option.icon}
                  </div>
                )}
                {option.label && (
                  <h3 className="mt-6 text-base font-semibold text-[#1F1B3A]">{option.label}</h3>
                )}
                {option.description && (
                  <p className="mt-2 text-sm text-[#706D99]">{option.description}</p>
                )}
              </button>
            );
          })}
        </div>

        <div className="mt-12 flex justify-center">
          <PrimaryButton onClick={() => onNext(selectedId)} disabled={!selectedId} className="px-10">
            Continue
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default EducationRoleSelectionScreen;

