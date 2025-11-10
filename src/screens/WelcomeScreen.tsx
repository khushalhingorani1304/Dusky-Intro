import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { MagnifyingGlassIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import gsap from 'gsap';

interface WelcomeScreenProps {
  onNext: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNext }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "Hey there! I'm Dusky.";

  useEffect(() => {
    let currentIndex = 0;
    const typingSpeed = 80; // milliseconds per character
    
    const typeTimer = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeTimer);
        // Hide cursor after typing is complete
        setTimeout(() => setShowCursor(false), 500);
      }
    }, typingSpeed);

    return () => clearInterval(typeTimer);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const elements = [
        '.welcome-logo',
        '.welcome-subheading',
        '.welcome-features-title',
        '.welcome-feature-1',
        '.welcome-feature-2',
        '.welcome-button'
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
          delay: 0.5,
          ease: 'power3.out' 
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      onNext();
    }, 1000);
  };

  return (
    <div ref={containerRef} className="flex flex-col items-center min-h-screen bg-dusky-flow">
      <div className="max-w-[50.4rem] w-full px-6 flex-1 flex items-center">
        <div className="w-full">
          <div className="flex justify-start mb-8 welcome-logo">
            <div className="w-14 h-14 bg-purple-600 rounded-xl flex items-center justify-center shadow-sm relative overflow-hidden">
              {/* Purple Hourglass SVG */}
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 4H24V10C24 13.3137 21.3137 16 18 16H14C10.6863 16 8 13.3137 8 10V4Z" fill="white" opacity="0.9"/>
                <path d="M8 28H24V22C24 18.6863 21.3137 16 18 16H14C10.6863 16 8 18.6863 8 22V28Z" fill="white" opacity="0.9"/>
                <circle cx="16" cy="16" r="2" fill="white"/>
              </svg>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2 welcome-heading min-h-[2.5rem]">
            {displayedText}
            {showCursor && <span className="animate-pulse">|</span>}
          </h1>
          <p className="text-lg text-gray-600 mb-6 welcome-subheading">
            I'm your new AI content assistant. I'm here to help you create, research, and brainstorm amazing content, faster than ever.
          </p>
          
          <h3 className="font-bold text-gray-900 mb-4 welcome-features-title">
            Here's what I'm really good at:
          </h3>
          
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3 welcome-feature-1">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                <DocumentTextIcon className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">
                  Content Creation
                </div>
                <div className="text-gray-600">
                  Generate social media posts, video scripts, blog articles, and more.
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3 welcome-feature-2">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                <MagnifyingGlassIcon className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <div className="font-semibold text-gray-900 mb-1">
                  Deep Research
                </div>
                <div className="text-gray-600">
                  Quickly find, organize, and summarize information from any source.
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-start welcome-button">
            <button
              onClick={handleButtonClick}
              disabled={isLoading}
              className="bg-purple-600 text-white font-semibold py-2 px-5 rounded-lg shadow-sm hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed relative min-w-[120px] h-[42px]"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : (
                "I'm Ready!"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
