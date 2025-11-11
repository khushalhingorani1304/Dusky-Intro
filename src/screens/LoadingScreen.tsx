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

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
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
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[#F8F7FF] px-6 py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,116,255,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(45,212,191,0.08),transparent_60%)]" />
      <div
        ref={containerRef}
        className="relative w-full max-w-4xl rounded-[36px] border border-white/40 bg-white px-10 py-16 shadow-[0_28px_60px_-32px_rgba(63,55,146,0.32)]"
      >
        <div className="loading-logo flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-[#3B82F6] shadow-lg shadow-[#3B82F6]/40">
            <RectangleStackIcon className="h-8 w-8 text-white" />
          </div>
        </div>

        <div className="mt-12 space-y-6">
          {LOADING_STEPS.map((step, index) => {
            const isCompleted = completedSteps.includes(index);
            const isCurrent = !isCompleted && completedSteps.length === index;

            return (
              <div
                key={index}
                className={`loading-step-${index} flex items-center justify-between rounded-[24px] border px-6 py-4 transition ${
                  isCompleted || isCurrent
                    ? 'border-[#6C4DF5]/60 bg-[#F5F2FF]'
                    : 'border-[#E0DEF5] bg-white'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-[#6C4DF5] drop-shadow-[0_0_10px_rgba(147,51,234,0.35)] animate-pulse ${
                      isCompleted || isCurrent ? 'bg-[#F2F0FF]' : 'bg-[#F7F5FF]'
                    }`}
                  >
                    <CheckIcon className="h-5 w-5" />
                  </span>
                  <span
                    className={`text-lg font-medium ${
                      isCompleted
                        ? 'text-[#1F1B3A]'
                        : isCurrent
                        ? 'text-[#4F46E5]'
                        : 'text-[#9A96C7]'
                    }`}
                  >
                    {step}
                  </span>
                </div>
                <div
                  className={`h-2 w-16 rounded-full transition ${
                    isCompleted || isCurrent ? 'bg-[#6C4DF5]' : 'bg-[#DDD9F2]'
                  }`}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
