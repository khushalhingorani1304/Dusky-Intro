import React, { useLayoutEffect, useRef, useState, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { PrimaryButton } from '../components/PrimaryButton';
import type { WelcomeFeatureConfig } from '../types/onboarding';
import { getIconComponent } from '../utils/iconLibrary';

interface WelcomeScreenProps {
  onNext: () => void;
  greeting: string;
  subheading: string;
  whatsNextTitle: string;
  whatsNextDescription: string;
  features: WelcomeFeatureConfig[];
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onNext,
  greeting,
  subheading,
  whatsNextTitle,
  whatsNextDescription,
  features,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = 80; // milliseconds per character

    const typeTimer = setInterval(() => {
      if (currentIndex <= greeting.length) {
        setDisplayedText(greeting.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeTimer);
        // Hide cursor after typing is complete
        setTimeout(() => setShowCursor(false), 500);
      }
    }, typingSpeed);

    return () => {
      clearInterval(typeTimer);
      setDisplayedText('');
      setShowCursor(true);
    };
  }, [greeting]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const elements = [
        '.welcome-logo',
        '.welcome-heading',
        '.welcome-subheading',
        '.welcome-features',
        '.welcome-button',
      ];

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
          stagger: 0.08,
          delay: 0.3,
          ease: 'power3.out',
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const featureItems = useMemo(
    () =>
      features.map((feature) => {
        const Icon = getIconComponent(feature.icon);
        return { ...feature, Icon };
      }),
    [features]
  );

  const handleButtonClick = () => {
    if (isLoading) return;
    setIsLoading(true);
    setTimeout(() => {
      onNext();
    }, 900);
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center bg-[#F6F7FB] px-6 py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,116,255,0.16),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(45,212,191,0.12),transparent_60%)]" />
      <div
        ref={containerRef}
        className="relative w-full max-w-5xl rounded-[36px] border border-white/45 bg-white/90 px-10 py-16 shadow-[0_30px_70px_-32px_rgba(58,51,140,0.35)] backdrop-blur-2xl md:px-16"
      >
        <div className="mt-2 grid gap-12 md:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-8">
            <div className="welcome-logo inline-flex items-center gap-4 rounded-[24px] border border-white/50 bg-white/70 px-6 py-4 shadow-[0_20px_30px_-24px_rgba(108,77,245,0.5)] backdrop-blur-lg">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#6C4DF5] shadow-lg shadow-[#6C4DF5]/30">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M8 4H24V10C24 13.3137 21.3137 16 18 16H14C10.6863 16 8 13.3137 8 10V4Z"
                    fill="white"
                    opacity="0.9"
                  />
                  <path
                    d="M8 28H24V22C24 18.6863 21.3137 16 18 16H14C10.6863 16 8 18.6863 8 22V28Z"
                    fill="white"
                    opacity="0.9"
                  />
                  <circle cx="16" cy="16" r="2" fill="white" />
                </svg>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold uppercase tracking-wide text-[#6C4DF5]">Welcome</span>
                <span className="text-sm text-[#6F6C8F]">Let’s get you up and running</span>
              </div>
            </div>

            <div className="welcome-heading space-y-4">
              <h1 className="min-h-[2.75rem] text-4xl font-bold tracking-tight text-[#1A1A1A] md:text-5xl">
                {displayedText}
                {showCursor && <span className="animate-pulse">|</span>}
              </h1>
              <p className="text-lg text-[#6F6C8F]">
                {subheading}
              </p>
            </div>

            <div className="welcome-features grid gap-4">
              {featureItems.map((feature) => (
                <div
                  key={feature.id}
                  className="flex items-start gap-4 rounded-[24px] border border-white/50 bg-white/75 px-6 py-5 shadow-[0_16px_28px_-26px_rgba(108,77,245,0.55)] backdrop-blur-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F3F1FF] text-[#6C4DF5]">
                    <feature.Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-[#1F1B3A]">{feature.title}</h3>
                    <p className="mt-1 text-sm text-[#6F6C8F]">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="welcome-button flex flex-col justify-between rounded-[28px] border border-white/50 bg-[#F6F4FF]/80 px-8 py-10 shadow-[0_20px_45px_-32px_rgba(108,77,245,0.55)] backdrop-blur-xl">
            <div className="space-y-4">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[#6C4DF5]">
                {whatsNextTitle}
              </p>
              <p className="text-base text-[#5F5B85]">{whatsNextDescription}</p>
            </div>
            <PrimaryButton
              onClick={handleButtonClick}
              disabled={isLoading}
              className="relative flex h-12 w-full items-center justify-center text-base font-semibold"
            >
              {isLoading ? (
                <svg
                  className="h-6 w-6 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "I'm Ready!"
              )}
            </PrimaryButton>
          </div>
        </div>
      </div>
    </div>
  );
};
