import React from 'react';

interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  currentStep,
  totalSteps,
}) => {
  return (
    <div className="flex gap-2 mb-8">
      {Array.from({ length: totalSteps }).map((_, index) => {
        const stepNumber = index + 1;
        const isActive = stepNumber <= currentStep;
        
        return (
          <div
            key={index}
            className={`h-1.5 flex-1 rounded-full ${
              isActive ? 'bg-purple-600' : 'bg-gray-200'
            }`}
          />
        );
      })}
    </div>
  );
};

