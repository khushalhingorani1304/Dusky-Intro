import React from 'react';
import { CheckIcon } from '@heroicons/react/24/solid';

interface SelectableCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

export const SelectableCard: React.FC<SelectableCardProps> = ({
  title,
  description,
  icon,
  isSelected,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={`border rounded-lg p-3 text-left w-full hover:border-purple-400 transition-colors relative ${
        isSelected
          ? 'border-purple-600 border-2'
          : 'border-gray-300'
      }`}
    >
      {isSelected && (
        <div className="absolute top-2 right-2">
          <CheckIcon className="w-4 h-4 text-purple-600" />
        </div>
      )}
      <div className="flex items-center gap-3">
        {icon && <div className="flex-shrink-0">{icon}</div>}
        <div className="space-y-1">
          <div className="font-semibold text-gray-900">{title}</div>
          {description && (
            <div className="text-sm text-gray-600">{description}</div>
          )}
        </div>
      </div>
    </button>
  );
};

