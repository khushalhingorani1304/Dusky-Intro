import React, { useLayoutEffect, useRef, useState } from 'react';
import { RectangleStackIcon } from '@heroicons/react/24/outline';
import { SelectableCard } from '../components/SelectableCard';
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
        '.challenge-logo',
        '.challenge-heading',
        '.challenge-subheading',
        '.challenge-grid',
        '.challenge-button'
      ];

      gsap.fromTo(
        elements,
        { 
          autoAlpha: 0, 
          y: 30 
        },
        { 
          autoAlpha: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.1,
          ease: 'power3.out' 
        }
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
      <div className="max-w-[50.4rem] w-full px-6 flex-1 flex items-center -mt-[1.3rem]">
        <div className="w-full">
          <div className="flex justify-start mb-8 challenge-logo">
            <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
              <RectangleStackIcon className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2 challenge-heading">
            {title}
          </h2>
          <p className="text-lg text-gray-600 mb-6 challenge-subheading">
            {subtitle}
          </p>
          
          <div className="grid grid-cols-2 gap-3 mb-8 challenge-grid">
            {options.map((challenge) => (
              <SelectableCard
                key={challenge.id}
                title={challenge.label}
                isSelected={selectedChallenges.includes(challenge.id)}
                onClick={() => handleToggleChallenge(challenge.id)}
              />
            ))}
          </div>
          
          <div className="challenge-button">
            <PrimaryButton
              onClick={() => onNext(selectedChallenges)}
              disabled={selectedChallenges.length === 0}
            >
              Next
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};
