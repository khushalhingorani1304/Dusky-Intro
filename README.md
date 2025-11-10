# Dusky Intro - Multi-Step Onboarding Flow

A beautiful multi-step onboarding flow for getdusky.ai built with React, TypeScript, Tailwind CSS, and Vite.

## Features

- 🎨 Modern, responsive design with Tailwind CSS
- 📱 Mobile-friendly layout
- 🎯 6-step onboarding flow:
  1. Welcome screen with feature highlights
  2. Name input collection
  3. Challenge selection (up to 3)
  4. Content type selection
  5. Prompt input for first notebook
  6. Loading screen with animated progress steps
- ✨ Smooth transitions and animations
- 🎨 Custom purple color scheme (#7F56D9)
- 📦 TypeScript for type safety

## Getting Started

### Install Dependencies

```bash
npm install
```

### Development Server

Run the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
dusky-intro/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── PrimaryButton.tsx
│   │   ├── ProgressIndicator.tsx
│   │   ├── SelectableCard.tsx
│   │   └── TextInput.tsx
│   ├── screens/             # Onboarding flow screens
│   │   ├── WelcomeScreen.tsx
│   │   ├── NameInputScreen.tsx
│   │   ├── ChallengeSelectionScreen.tsx
│   │   ├── ContentTypeScreen.tsx
│   │   ├── PromptInputScreen.tsx
│   │   └── LoadingScreen.tsx
│   ├── App.tsx              # Main app component (orchestrates screens)
│   ├── main.tsx             # Application entry point
│   └── index.css            # Global styles with Tailwind
├── index.html
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json
```

## Design System

### Colors
- **Primary Purple**: `#7F56D9` (bg-purple-600)
- **Text Dark**: `text-gray-900`
- **Text Body**: `text-gray-600`
- **Borders**: `border-gray-300`

### Typography
- **Headings**: `text-3xl font-bold text-gray-900 mb-2`
- **Subheadings**: `text-lg text-gray-600 mb-6`

## Components

### PrimaryButton
A styled button component with purple background and hover effects.

### ProgressIndicator
Shows progress through the onboarding steps with visual indicators.

### SelectableCard
A card component that can be selected/deselected with visual feedback.

### TextInput
A styled text input with focus states.

## Technologies

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Heroicons** - Icon library

## License

Private project for getdusky.ai
