import React from 'react';

export interface IconComponentProps {
  className?: string;
}

type IconMap = Record<string, React.FC<IconComponentProps>>;

const createSvgIcon =
  (path: React.ReactNode, viewBox = '0 0 64 64', svgProps: Partial<React.SVGProps<SVGSVGElement>> = {}) =>
  ({ className }: IconComponentProps) =>
    (
      <svg
        className={className}
        viewBox={viewBox}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...svgProps}
      >
        {path}
      </svg>
    );

const EmojiIcon =
  (emoji: string) =>
  ({ className }: IconComponentProps) =>
    (
      <span className={className ?? 'text-2xl'} role="img" aria-hidden="true">
        {emoji}
      </span>
    );

export const iconLibrary: IconMap = {
  sparkles: createSvgIcon(
    <>
      <path
        d="M32 12l2.9 7.6 7.6 2.9-7.6 2.9-2.9 7.6-2.9-7.6-7.6-2.9 7.6-2.9z"
        fill="#A855F7"
      />
      <path
        d="M16 28l1.6 4.4 4.4 1.6-4.4 1.6L16 40l-1.6-4.4L10 34l4.4-1.6z"
        fill="#C084FC"
      />
      <path
        d="M48 24l1.6 4.4 4.4 1.6-4.4 1.6L48 36l-1.6-4.4L42 30l4.4-1.6z"
        fill="#8B5CF6"
      />
    </>
  ),
  document: createSvgIcon(
    <>
      <rect x="18" y="10" width="28" height="44" rx="6" fill="#6366F1" />
      <path d="M24 20h16M24 28h16M24 36h10" stroke="#EEF2FF" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  search: createSvgIcon(
    <>
      <circle cx="30" cy="30" r="12" stroke="#0EA5E9" strokeWidth="6" />
      <line x1="38" y1="38" x2="50" y2="50" stroke="#0EA5E9" strokeWidth="6" strokeLinecap="round" />
    </>
  ),
  armchair: createSvgIcon(
    <>
      <rect x="18" y="26" width="28" height="18" rx="8" fill="#8B5CF6" />
      <rect x="22" y="20" width="20" height="12" rx="8" fill="#C4B5FD" />
      <rect x="22" y="40" width="6" height="10" rx="3" fill="#6D28D9" />
      <rect x="36" y="40" width="6" height="10" rx="3" fill="#6D28D9" />
    </>
  ),
  monitor: createSvgIcon(
    <>
      <rect x="14" y="16" width="36" height="24" rx="6" fill="#3B82F6" />
      <rect x="18" y="20" width="28" height="16" rx="4" fill="#DBEAFE" />
      <rect x="28" y="40" width="8" height="8" rx="2" fill="#1E3A8A" />
      <rect x="24" y="46" width="16" height="4" rx="2" fill="#1D4ED8" opacity="0.7" />
    </>
  ),
  book: createSvgIcon(
    <>
      <path
        d="M20 16h12c4 0 6 2 6 6v26c-2-2-4-3-6-3H20c-2 0-4 1-4 3V22c0-4 2-6 4-6Z"
        fill="#60A5FA"
      />
      <path
        d="M44 16H32c-4 0-6 2-6 6v26c2-2 4-3 6-3h12c2 0 4 1 4 3V22c0-4-2-6-4-6Z"
        fill="#1D4ED8"
      />
      <path d="M28 26h8" stroke="#DBEAFE" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  megaphone: createSvgIcon(
    <>
      <path d="M18 28l24-12v24L18 32v-4Z" fill="#F97316" stroke="#EA580C" strokeWidth="2" />
      <path d="M42 20l6-3v20l-6-3" stroke="#FB923C" strokeWidth="4" strokeLinecap="round" />
      <rect x="24" y="34" width="6" height="12" rx="3" fill="#EA580C" />
    </>
  ),
  gem: createSvgIcon(
    <>
      <path
        d="M12 24L24 8h16l12 16L32 56 12 24Z"
        fill="#FACC15"
        stroke="#EAB308"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M32 8v32" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </>
  ),
  phone: createSvgIcon(
    <>
      <path
        d="M20 10h8l4 10-8 6a24 24 0 0010 10l6-8 10 4v8c0 4-3 7-7 7-20.5 0-37-16.5-37-37 0-4 3-7 7-7Z"
        fill="#F472B6"
        stroke="#EC4899"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  headset: createSvgIcon(
    <>
      <circle cx="32" cy="28" r="16" fill="#9CA3AF" />
      <path d="M16 28h-4a6 6 0 000 12h4" stroke="#6B7280" strokeWidth="4" strokeLinecap="round" />
      <path d="M48 28h4a6 6 0 010 12h-4" stroke="#6B7280" strokeWidth="4" strokeLinecap="round" />
      <rect x="26" y="40" width="12" height="6" rx="3" fill="#4B5563" />
    </>
  ),
  star: createSvgIcon(
    <>
      <path
        d="M32 8l6.8 13.7 15.2 2.2-11 10.7 2.6 15.4L32 43.6 18.4 50l2.6-15.4-11-10.7 15.2-2.2L32 8Z"
        fill="#FACC15"
        stroke="#EAB308"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </>
  ),
  chart: createSvgIcon(
    <>
      <rect x="16" y="28" width="8" height="20" rx="2" fill="#F472B6" />
      <rect x="28" y="22" width="8" height="26" rx="2" fill="#38BDF8" />
      <rect x="40" y="34" width="8" height="14" rx="2" fill="#34D399" />
      <path d="M18 26l12-8 12 6 6-8" stroke="#6366F1" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  palette: createSvgIcon(
    <>
      <path
        d="M32 10c11.6 0 21 7.8 21 17.5 0 6.2-4 8.5-8 8.5-3.2 0-5 1.8-5 4.5 0 3 2.5 5.5 5.5 5.5-3.8 5.1-9.6 8-15.5 8C18.9 54 11 46.3 11 36.5S20.4 10 32 10Z"
        fill="#F472B6"
      />
      <circle cx="24" cy="26" r="3" fill="#FDE68A" />
      <circle cx="32" cy="22" r="3" fill="#60A5FA" />
      <circle cx="40" cy="26" r="3" fill="#34D399" />
    </>
  ),
  molecule: createSvgIcon(
    <>
      <circle cx="20" cy="20" r="8" fill="#34D399" />
      <circle cx="44" cy="20" r="6" fill="#22C55E" />
      <circle cx="32" cy="40" r="10" fill="#0EA5E9" opacity="0.85" />
      <path d="M20 20l12 20 12-20" stroke="#0EA5E9" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  dots: createSvgIcon(
    <>
      <circle cx="24" cy="32" r="6" fill="#9CA3AF" />
      <circle cx="32" cy="32" r="6" fill="#9CA3AF" />
      <circle cx="40" cy="32" r="6" fill="#9CA3AF" />
    </>
  ),
  sprout: createSvgIcon(
    <>
      <path d="M32 36c0-8 6-14 14-14" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" />
      <path d="M32 24c0-6-5-11-11-11" stroke="#16A34A" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
      <rect x="30" y="30" width="4" height="22" rx="2" fill="#16A34A" />
      <circle cx="46" cy="22" r="8" fill="#A3E635" />
      <circle cx="21" cy="13" r="6" fill="#A3E635" opacity="0.7" />
    </>
  ),
  branch: createSvgIcon(
    <>
      <path d="M18 44s14-16 28-18" stroke="#22C55E" strokeWidth="5" strokeLinecap="round" />
      <circle cx="20" cy="38" r="7" fill="#34D399" />
      <circle cx="40" cy="30" r="9" fill="#34D399" opacity="0.8" />
      <circle cx="34" cy="20" r="5" fill="#22C55E" />
    </>
  ),
  tree: createSvgIcon(
    <>
      <circle cx="32" cy="24" r="16" fill="#4ADE80" />
      <circle cx="42" cy="32" r="10" fill="#22C55E" opacity="0.85" />
      <rect x="28" y="38" width="8" height="18" rx="3" fill="#15803D" />
      <rect x="24" y="54" width="16" height="4" rx="2" fill="#166534" />
    </>
  ),
  pine: createSvgIcon(
    <>
      <path
        d="M32 8l14 18h-9l9 12h-8l8 12H18l8-12h-8l9-12h-9L32 8Z"
        fill="#10B981"
      />
      <rect x="28" y="46" width="8" height="16" rx="2" fill="#047857" />
    </>
  ),
  palm: createSvgIcon(
    <>
      <path d="M32 28c0-10 8-18 18-18" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" />
      <path d="M32 28c0-10-8-18-18-18" stroke="#22C55E" strokeWidth="4" strokeLinecap="round" />
      <path d="M32 28c0-10 4-18 10-18" stroke="#34D399" strokeWidth="4" strokeLinecap="round" opacity="0.8" />
      <rect x="28" y="28" width="8" height="24" rx="3" fill="#047857" />
      <path d="M22 52h20" stroke="#0F766E" strokeWidth="4" strokeLinecap="round" />
    </>
  ),
  landscape: createSvgIcon(
    <>
      <path
        d="M12 44c6-6 12-10 20-10s14 4 20 10"
        stroke="#0EA5E9"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path d="M18 44h28v8H18z" fill="#34D399" opacity="0.8" />
      <circle cx="22" cy="32" r="6" fill="#22C55E" />
      <circle cx="40" cy="30" r="8" fill="#0EA5E9" opacity="0.6" />
    </>
  ),
  speech: EmojiIcon('💬'),
  newsletter: EmojiIcon('📰'),
  searchEmoji: EmojiIcon('🔍'),
  tiktok: EmojiIcon('🎵'),
  mobile: EmojiIcon('📱'),
  youtube: EmojiIcon('▶️'),
  linkedin: EmojiIcon('🔗'),
  twitter: EmojiIcon('✖️'),
  ai: EmojiIcon('✨'),
  other: EmojiIcon('…'),
};

export const ICON_OPTIONS = [
  { id: 'sparkles', label: 'Sparkles' },
  { id: 'document', label: 'Document' },
  { id: 'search', label: 'Search' },
  { id: 'armchair', label: 'Armchair' },
  { id: 'monitor', label: 'Monitor' },
  { id: 'book', label: 'Book' },
  { id: 'megaphone', label: 'Megaphone' },
  { id: 'gem', label: 'Gem' },
  { id: 'phone', label: 'Phone' },
  { id: 'headset', label: 'Headset' },
  { id: 'star', label: 'Star' },
  { id: 'chart', label: 'Chart' },
  { id: 'palette', label: 'Palette' },
  { id: 'molecule', label: 'Molecule' },
  { id: 'dots', label: 'Dots' },
  { id: 'sprout', label: 'Sprout' },
  { id: 'branch', label: 'Branch' },
  { id: 'tree', label: 'Tree' },
  { id: 'pine', label: 'Pine' },
  { id: 'palm', label: 'Palm' },
  { id: 'landscape', label: 'Landscape' },
  { id: 'speech', label: 'Chat Bubble' },
  { id: 'newsletter', label: 'Newsletter' },
  { id: 'searchEmoji', label: 'Magnifier' },
  { id: 'tiktok', label: 'Music Note' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'youtube', label: 'Play Button' },
  { id: 'linkedin', label: 'Link' },
  { id: 'twitter', label: 'X Logo' },
  { id: 'ai', label: 'Sparkle Emoji' },
  { id: 'other', label: 'Ellipsis' },
];

export const getIconComponent = (id?: string): React.FC<IconComponentProps> => {
  if (id && iconLibrary[id]) {
    return iconLibrary[id];
  }
  return iconLibrary.sparkles;
};


