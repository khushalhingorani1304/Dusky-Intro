import React, { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';
import { RectangleStackIcon } from '@heroicons/react/24/outline';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete: () => void;
  progressActive?: number;
  progressTotal?: number;
}

const LOADING_STEPS = [
  'Creating your first canvas...',
  'Searching the web for the best sources...',
  'Evaluating quality and recency...',
  'Adding sources to your canvas...',
];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onComplete,
  progressActive = 0,
  progressTotal = 12,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const elements = [
        '.loading-logo',
        '.loading-step-0',
        '.loading-step-1',
        '.loading-step-2',
        '.loading-step-3'
      ];

      gsap.fromTo(
        elements,
        { 
          autoAlpha: 0, 
          x: -20 
        },
        { 
          autoAlpha: 1, 
          x: 0, 
          duration: 0.5, 
          stagger: 0.1,
          ease: 'power3.out' 
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let currentStep = 0;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const processStep = () => {
      if (currentStep < LOADING_STEPS.length) {
        const timeout = setTimeout(() => {
          setCompletedSteps((prev) => [...prev, currentStep]);
          currentStep++;
          processStep();
        }, 1500);
        timeouts.push(timeout);
      } else {
        // Wait a bit before completing
        const finalTimeout = setTimeout(() => {
          onComplete();
        }, 500);
        timeouts.push(finalTimeout);
      }
    };

    processStep();

    return () => {
      timeouts.forEach((timeout) => clearTimeout(timeout));
    };
  }, [onComplete]);

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
          <div className="flex justify-start mb-8 loading-logo">
            <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center shadow-sm">
              <RectangleStackIcon className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <div className="space-y-4">
          {LOADING_STEPS.map((step, index) => {
            const isCompleted = completedSteps.includes(index);

            return (
              <div key={index} className={`flex items-center gap-3 loading-step-${index}`}>
                <div className="flex-shrink-0 text-purple-600 drop-shadow-[0_0_10px_rgba(147,51,234,0.6)] animate-pulse">
                  <CheckIcon className="w-6 h-6" />
                </div>
                <div className={`text-lg ${isCompleted ? 'text-gray-900' : 'text-gray-400'}`}>
                  {step}
                </div>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
};
