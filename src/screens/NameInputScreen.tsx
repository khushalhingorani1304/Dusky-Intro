import React, { useLayoutEffect, useRef, useState } from 'react';
import { ArrowRightIcon, RectangleStackIcon } from '@heroicons/react/24/outline';
import { PrimaryButton } from '../components/PrimaryButton';
import gsap from 'gsap';

interface NameInputScreenProps {
  onNext: (name: string) => void;
  progressActive?: number;
  progressTotal?: number;
}

export const NameInputScreen: React.FC<NameInputScreenProps> = ({
  onNext,
  progressActive = 0,
  progressTotal = 12,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [name, setName] = useState('');

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const elements = [
        '.name-logo',
        '.name-heading',
        '.name-input-group'
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
          stagger: 0.15,
          ease: 'power3.out' 
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleNext = () => {
    if (name.trim()) {
      onNext(name.trim());
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
      <div className="max-w-[50.4rem] w-full px-6 flex-1 flex items-start mt-[5.75rem]">
        <div className="w-full">
          <div className="flex justify-start mb-8 name-logo">
            <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
              <RectangleStackIcon className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-2 name-heading">
            Before we get started, what should I call you?
          </h2>
          
          <div className="flex gap-2 mt-6 name-input-group">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && name.trim()) {
                  handleNext();
                }
              }}
              placeholder="Enter your name"
              className="border border-gray-300 rounded-lg p-3 flex-1 focus:border-purple-500 focus:ring-purple-500 focus:outline-none"
            />
            <PrimaryButton
              onClick={handleNext}
              disabled={!name.trim()}
              className="w-12 h-12 p-0 flex items-center justify-center"
            >
              <ArrowRightIcon className="w-5 h-5" />
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};
