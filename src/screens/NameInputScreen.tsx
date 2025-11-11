import React, { useLayoutEffect, useRef, useState } from 'react';
import { RectangleStackIcon } from '@heroicons/react/24/outline';
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
      const elements = ['.name-logo', '.name-heading', '.name-input-group'];

      gsap.fromTo(
        elements,
        {
          autoAlpha: 0,
          y: 30,
        },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
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
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[#F6F7FB] px-6 py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,116,255,0.16),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(45,212,191,0.12),transparent_60%)]" />
      <div
        ref={containerRef}
        className="relative w-full max-w-4xl rounded-[36px] border border-white/45 bg-white/90 px-10 py-16 shadow-[0_30px_70px_-32px_rgba(58,51,140,0.35)] backdrop-blur-2xl md:px-16"
      >
        <div className="mt-12 space-y-10">
          <div className="name-logo inline-flex items-center gap-4 rounded-[24px] border border-white/50 bg-white/70 px-6 py-4 shadow-[0_20px_30px_-24px_rgba(108,77,245,0.5)] backdrop-blur-lg">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#6C4DF5] shadow-lg shadow-[#6C4DF5]/30">
              <RectangleStackIcon className="h-8 w-8 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold uppercase tracking-wide text-[#6C4DF5]">
                Quick intro
              </span>
              <span className="text-sm text-[#6F6C8F]">Tell me what to call you</span>
            </div>
          </div>

          <div className="name-heading space-y-4">
            <h2 className="text-4xl font-bold tracking-tight text-[#1A1A1A] md:text-[2.7rem]">
              Before we get started, what should I call you?
            </h2>
            <p className="text-base text-[#6F6C8F]">
              I’ll use this to personalize canvases, notes, and any content we collaborate on together.
            </p>
          </div>

          <div className="name-input-group flex flex-col gap-5 rounded-[28px] border border-white/50 bg-white/80 px-8 py-8 shadow-[0_20px_45px_-32px_rgba(108,77,245,0.55)] backdrop-blur-xl md:flex-row md:items-center md:gap-6">
            <label htmlFor="name-input" className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6C4DF5]">
              Your name
            </label>
            <div className="flex flex-1 flex-col gap-4 md:flex-row md:items-center">
              <input
                id="name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && name.trim()) {
                    handleNext();
                  }
                }}
                placeholder="Type your name here"
                className="flex-1 rounded-2xl border border-[#E0DDFF] bg-white/90 px-4 py-3 text-base text-[#1F1B3A] shadow-inner shadow-white/60 transition placeholder:text-[#A5A3C1] focus:border-[#6C4DF5] focus:outline-none focus:ring-4 focus:ring-[#6C4DF5]/20"
              />
              <PrimaryButton
                onClick={handleNext}
                disabled={!name.trim()}
                className="h-12 px-8 text-base font-semibold"
              >
                Continue
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
