import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useOnboardingConfig } from '../context/OnboardingConfigContext';
import type {
  WelcomeConfig,
  WelcomeFeatureConfig,
  TeamConfig,
  ChallengeConfig,
  SelectOption,
} from '../types/onboarding';
import { ICON_OPTIONS, getIconComponent } from '../utils/iconLibrary';

const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 10)}`;

const IconPicker: React.FC<{ value: string; onChange: (value: string) => void }> = ({ value, onChange }) => {
  const options = ICON_OPTIONS;
  const selectedId = options.some((item) => item.id === value) ? value : options[0].id;
  const Icon = getIconComponent(selectedId);
  return (
    <div className="flex items-center gap-3">
      <select
        className="w-full rounded-2xl border border-[#E0DEF5] bg-white px-4 py-2 text-sm text-[#1F1B3A] focus:border-[#6C4DF5] focus:outline-none focus:ring-4 focus:ring-[#6C4DF5]/20"
        value={selectedId}
        onChange={(event) => onChange(event.target.value)}
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#F3F1FF] text-[#6C4DF5]">
        <Icon className="h-6 w-6" />
      </span>
    </div>
  );
};

const AdminPage: React.FC = () => {
  const { config, updateWelcomeConfig, updateCompanyConfig, updateChallengeConfig, resetConfig } =
    useOnboardingConfig();

  const [welcomeForm, setWelcomeForm] = useState<WelcomeConfig>(config.welcome);
  const [companyForm, setCompanyForm] = useState<TeamConfig>(config.company);
  const [challengeForm, setChallengeForm] = useState<ChallengeConfig>(config.challenge);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    setWelcomeForm(config.welcome);
    setCompanyForm(config.company);
    setChallengeForm(config.challenge);
  }, [config]);

  const resetStatus = () => {
    setTimeout(() => setStatusMessage(null), 2000);
  };

  const DEFAULT_WELCOME = config.welcome;

  const handleWelcomeSave = () => {
    const cleanedFeatures = welcomeForm.features
      .map<WelcomeFeatureConfig>((feature) => ({
        ...feature,
        title: feature.title.trim(),
        description: feature.description.trim(),
      }))
      .filter((feature) => feature.title.length > 0);

    updateWelcomeConfig({
      greeting: welcomeForm.greeting.trim() || DEFAULT_WELCOME.greeting,
      subheading: welcomeForm.subheading.trim() || DEFAULT_WELCOME.subheading,
      whatsNextTitle: welcomeForm.whatsNextTitle.trim() || DEFAULT_WELCOME.whatsNextTitle,
      whatsNextDescription:
        welcomeForm.whatsNextDescription.trim() || DEFAULT_WELCOME.whatsNextDescription,
      features: cleanedFeatures.length > 0 ? cleanedFeatures : DEFAULT_WELCOME.features,
    });
    setStatusMessage('Welcome screen saved.');
    resetStatus();
  };

  const handleCompanySave = () => {
    updateCompanyConfig({
      ...companyForm,
      options: companyForm.options.filter((option) => option.label.trim().length > 0),
    });
    setStatusMessage('Company configuration saved.');
    resetStatus();
  };

  const handleChallengeSave = () => {
    updateChallengeConfig({
      ...challengeForm,
      options: challengeForm.options.filter((option) => option.label.trim().length > 0),
      maxSelections: Math.max(1, Number(challengeForm.maxSelections) || 1),
    });
    setStatusMessage('Challenge configuration saved.');
    resetStatus();
  };

  const inputBase =
    'w-full rounded-2xl border border-[#E0DEF5] bg-white px-4 py-3 text-sm text-[#1F1B3A] shadow-sm focus:border-[#6C4DF5] focus:outline-none focus:ring-4 focus:ring-[#6C4DF5]/20';

  const renderOptionInputs = (
    options: SelectOption[],
    onChange: (updated: SelectOption[]) => void
  ) => (
    <div className="space-y-4">
      {options.map((option, index) => (
        <div
          key={option.id}
          className="flex flex-col gap-3 rounded-[24px] border border-[#E0DEF5] bg-white/90 px-4 py-4 shadow-sm md:flex-row md:items-center"
        >
          <input
            className={inputBase}
            value={option.label}
            placeholder="Option label"
            onChange={(event) => {
              const next = [...options];
              next[index] = { ...next[index], label: event.target.value };
              onChange(next);
            }}
          />
          <button
            type="button"
            className="self-start rounded-2xl border border-red-200 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50 md:self-auto"
            onClick={() => onChange(options.filter((item) => item.id !== option.id))}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        className="text-sm font-semibold text-[#6C4DF5] transition hover:text-[#4A32DD]"
        onClick={() =>
          onChange([
            ...options,
            { id: generateId('option'), label: '' },
          ])
        }
      >
        + Add option
      </button>
    </div>
  );

  const handleWelcomeFeatureChange = (index: number, updates: Partial<WelcomeFeatureConfig>) => {
    setWelcomeForm((prev) => {
      const nextFeatures = [...prev.features];
      nextFeatures[index] = { ...nextFeatures[index], ...updates };
      return { ...prev, features: nextFeatures };
    });
  };

  const handleAddWelcomeFeature = () => {
    setWelcomeForm((prev) => ({
      ...prev,
      features: [
        ...prev.features,
        {
          id: generateId('feature'),
          title: 'New feature',
          description: '',
          icon: ICON_OPTIONS[0].id,
        },
      ],
    }));
  };

  const handleRemoveWelcomeFeature = (index: number) => {
    setWelcomeForm((prev) => {
      if (prev.features.length <= 1) {
        return prev;
      }
      return { ...prev, features: prev.features.filter((_, idx) => idx !== index) };
    });
  };

  return (
    <div className="relative min-h-screen bg-[#F8F7FF] px-6 py-16">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,116,255,0.12),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(45,212,191,0.08),transparent_60%)]" />
      <div className="relative mx-auto flex max-w-5xl flex-col gap-10 rounded-[36px] border border-white/40 bg-white/90 px-10 py-14 shadow-[0_28px_60px_-32px_rgba(63,55,146,0.32)] backdrop-blur-2xl md:px-16">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[#1A1A1A]">Onboarding Admin</h1>
            <p className="mt-1 text-sm text-[#6F6C8F]">Manage the questions that power the onboarding flow.</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="rounded-2xl border border-[#DCD6FF] px-4 py-2 text-sm font-medium text-[#6C4DF5] transition hover:bg-[#F4F1FF]"
            >
              Back to onboarding
            </Link>
            <button
              type="button"
              className="rounded-2xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
              onClick={() => {
                resetConfig();
                setStatusMessage('Configuration reset to defaults.');
                resetStatus();
              }}
            >
              Reset to defaults
            </button>
          </div>
        </div>

        {statusMessage && (
          <div className="rounded-2xl bg-[#ECFDF5] px-4 py-3 text-sm font-medium text-[#047857] shadow-sm">
            {statusMessage}
          </div>
        )}

        <section className="space-y-6 rounded-[28px] border border-[#E0DEF5] bg-white/90 px-10 py-10 shadow">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl font-semibold text-[#1A1A1A]">Welcome Screen</h2>
            <p className="text-sm text-[#6F6C8F]">
              Customize the hero message, feature highlights, and sidebar copy shown on the first step.
            </p>
          </div>
          <div className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-[#4C4768]">Greeting text</label>
              <input
                className={`${inputBase} mt-2`}
                value={welcomeForm.greeting}
                onChange={(event) => setWelcomeForm({ ...welcomeForm, greeting: event.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-[#4C4768]">Subheading</label>
              <textarea
                className={`${inputBase} mt-2`}
                rows={3}
                value={welcomeForm.subheading}
                onChange={(event) => setWelcomeForm({ ...welcomeForm, subheading: event.target.value })}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-[#4C4768]">Sidebar title</label>
                <input
                  className={`${inputBase} mt-2`}
                  value={welcomeForm.whatsNextTitle}
                  onChange={(event) =>
                    setWelcomeForm({ ...welcomeForm, whatsNextTitle: event.target.value })
                  }
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-[#4C4768]">Sidebar description</label>
                <textarea
                  className={`${inputBase} mt-2`}
                  rows={3}
                  value={welcomeForm.whatsNextDescription}
                  onChange={(event) =>
                    setWelcomeForm({ ...welcomeForm, whatsNextDescription: event.target.value })
                  }
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-[#4C4768]">Feature cards</h3>
                <button
                  type="button"
                  className="text-sm font-semibold text-[#6C4DF5] transition hover:text-[#4A32DD]"
                  onClick={handleAddWelcomeFeature}
                >
                  + Add feature
                </button>
              </div>
              {welcomeForm.features.map((feature, index) => {
                const Icon = getIconComponent(feature.icon);
                return (
                  <div
                    key={feature.id}
                    className="space-y-4 rounded-[24px] border border-[#E0DEF5] bg-white/90 px-6 py-5 shadow-sm"
                  >
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className="text-sm font-semibold text-[#4C4768]">Feature title</label>
                        <input
                          className={`${inputBase} mt-2`}
                          value={feature.title}
                          onChange={(event) =>
                            handleWelcomeFeatureChange(index, { title: event.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="text-sm font-semibold text-[#4C4768]">Icon</label>
                        <div className="mt-2 flex items-center gap-3">
                          <IconPicker
                            value={feature.icon}
                            onChange={(icon) => handleWelcomeFeatureChange(index, { icon })}
                          />
                          <Icon className="hidden" />
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-[#4C4768]">Description</label>
                      <textarea
                        className={`${inputBase} mt-2`}
                        rows={3}
                        value={feature.description}
                        onChange={(event) =>
                          handleWelcomeFeatureChange(index, { description: event.target.value })
                        }
                      />
                    </div>
                    <button
                      type="button"
                      className="text-sm font-medium text-red-600 transition hover:text-red-700"
                      onClick={() => handleRemoveWelcomeFeature(index)}
                      disabled={welcomeForm.features.length <= 1}
                    >
                      Remove feature
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex flex-col gap-3 text-sm md:flex-row md:justify-end">
            <button
              type="button"
              className="rounded-2xl border border-[#E0DEF5] px-4 py-2 font-medium text-[#5B5976] transition hover:bg-[#F4F1FF]"
              onClick={() => setWelcomeForm(config.welcome)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="rounded-2xl bg-[#6C4DF5] px-5 py-2 font-semibold text-white shadow-sm transition hover:bg-[#5436E2]"
              onClick={handleWelcomeSave}
            >
              Save Welcome Screen
            </button>
          </div>
        </section>

        <section className="space-y-6 rounded-[28px] border border-[#E0DEF5] bg-white/90 px-10 py-10 shadow">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl font-semibold text-[#1A1A1A]">Company Screen</h2>
            <p className="text-sm text-[#6F6C8F]">
              Update the company question, subtitle, and option list shown to users who choose “Work.”
            </p>
          </div>
          <div className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-[#4C4768]">Question</label>
              <input
                className={`${inputBase} mt-2`}
                value={companyForm.title}
                onChange={(event) => setCompanyForm({ ...companyForm, title: event.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-[#4C4768]">Subtitle</label>
              <input
                className={`${inputBase} mt-2`}
                value={companyForm.subtitle}
                onChange={(event) => setCompanyForm({ ...companyForm, subtitle: event.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-[#4C4768]">Options</label>
              <div className="mt-3">
                {renderOptionInputs(companyForm.options, (updated) => setCompanyForm({ ...companyForm, options: updated }))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 text-sm md:flex-row md:justify-end">
            <button
              type="button"
              className="rounded-2xl border border-[#E0DEF5] px-4 py-2 font-medium text-[#5B5976] transition hover:bg-[#F4F1FF]"
              onClick={() => setCompanyForm(config.company)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="rounded-2xl bg-[#6C4DF5] px-5 py-2 font-semibold text-white shadow-sm transition hover:bg-[#5436E2]"
              onClick={handleCompanySave}
            >
              Save Company Screen
            </button>
          </div>
        </section>

        <section className="space-y-6 rounded-[28px] border border-[#E0DEF5] bg-white/90 px-10 py-10 shadow">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-2xl font-semibold text-[#1A1A1A]">Challenges Screen</h2>
            <p className="text-sm text-[#6F6C8F]">
              Control the multi-select challenge question that appears after referrals.
            </p>
          </div>
          <div className="space-y-6">
            <div>
              <label className="text-sm font-semibold text-[#4C4768]">Question</label>
              <input
                className={`${inputBase} mt-2`}
                value={challengeForm.title}
                onChange={(event) => setChallengeForm({ ...challengeForm, title: event.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-[#4C4768]">Subtitle</label>
              <input
                className={`${inputBase} mt-2`}
                value={challengeForm.subtitle}
                onChange={(event) => setChallengeForm({ ...challengeForm, subtitle: event.target.value })}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-[#4C4768]">Maximum selections</label>
                <input
                  type="number"
                  min={1}
                  className={`${inputBase} mt-2`}
                  value={challengeForm.maxSelections}
                  onChange={(event) =>
                    setChallengeForm({ ...challengeForm, maxSelections: Number(event.target.value) })
                  }
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-semibold text-[#4C4768]">Challenge options</label>
              <div className="mt-3">
                {renderOptionInputs(challengeForm.options, (updated) =>
                  setChallengeForm({ ...challengeForm, options: updated })
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 text-sm md:flex-row md:justify-end">
            <button
              type="button"
              className="rounded-2xl border border-[#E0DEF5] px-4 py-2 font-medium text-[#5B5976] transition hover:bg-[#F4F1FF]"
              onClick={() => setChallengeForm(config.challenge)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="rounded-2xl bg-[#6C4DF5] px-5 py-2 font-semibold text-white shadow-sm transition hover:bg-[#5436E2]"
              onClick={handleChallengeSave}
            >
              Save Challenges
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
