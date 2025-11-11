import {
  DocumentTextIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  BoltIcon,
  ChatBubbleLeftRightIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';

type IconComponent = (props: React.SVGProps<SVGSVGElement>) => JSX.Element;

const ICON_MAP: Record<string, IconComponent> = {
  'document-text': DocumentTextIcon,
  'magnifying-glass': MagnifyingGlassIcon,
  sparkles: SparklesIcon,
  bolt: BoltIcon,
  chat: ChatBubbleLeftRightIcon,
  idea: LightBulbIcon,
};

export const ICON_OPTIONS = [
  { id: 'document-text', label: 'Document' },
  { id: 'magnifying-glass', label: 'Magnifying Glass' },
  { id: 'sparkles', label: 'Sparkles' },
  { id: 'bolt', label: 'Bolt' },
  { id: 'chat', label: 'Chat' },
  { id: 'idea', label: 'Idea' },
];

export const getIconComponent = (id: string): IconComponent => {
  if (ICON_MAP[id]) {
    return ICON_MAP[id];
  }
  return DocumentTextIcon;
};

