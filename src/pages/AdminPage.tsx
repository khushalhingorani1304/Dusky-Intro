import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useOnboardingConfig } from '../context/OnboardingConfigContext';
import type { TeamConfig, ChallengeConfig, SelectOption } from '../types/onboarding';

const generateId = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 10)}`;

const AdminPage: React.FC = () => {
  const { config, updateCompanyConfig, updateChallengeConfig, resetConfig } = useOnboardingConfig();

  const [companyForm, setCompanyForm] = useState<TeamConfig>(config.company);
  const [challengeForm, setChallengeForm] = useState<ChallengeConfig>(config.challenge);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    setCompanyForm(config.company);
    setChallengeForm(config.challenge);
  }, [config]);

  const resetStatus = () => {
    setTimeout(() => setStatusMessage(null), 2000);
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
    'w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-200';
  const sectionBase = 'rounded-xl border border-gray-200 bg-white p-6 shadow-sm';
  const labelBase = 'text-sm font-semibold text-gray-700';

  const renderOptionInputs = (
    options: SelectOption[],
    onChange: (updated: SelectOption[]) => void,
    includeBadge = true
  ) => (
    <div className="space-y-3">
      {options.map((option, index) => (
        <div key={option.id} className="flex items-center gap-3">
          {includeBadge && (
            <input
              className={`${inputBase} max-w-[80px]`}
              value={option.badge ?? ''}
              placeholder="Badge"
              onChange={(event) => {
                const next = [...options];
                next[index] = { ...next[index], badge: event.target.value };
                onChange(next);
              }}
            />
          )}
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
            className="text-sm font-medium text-red-600 hover:text-red-700"
            onClick={() => onChange(options.filter((item) => item.id !== option.id))}
          >
            Remove
          </button>
        </div>
      ))}
      <button
        type="button"
        className="text-sm font-semibold text-purple-600 hover:text-purple-700"
        onClick={() =>
          onChange([
            ...options,
            { id: generateId('option'), label: '', badge: includeBadge ? '' : undefined },
          ])
        }
      >
        + Add option
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-dusky-flow">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <h1 className="text-2xl font-bold text-gray-900">Onboarding Admin</h1>
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="rounded-lg border border-purple-200 px-3 py-1.5 text-sm font-medium text-purple-600 hover:bg-purple-50"
            >
              Back to onboarding
            </Link>
            <button
              type="button"
              className="rounded-lg border border-red-200 px-3 py-1.5 text-sm font-semibold text-red-600 hover:bg-red-50"
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
      </header>

      <main className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-8">
        {statusMessage && (
          <div className="rounded-lg bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
            {statusMessage}
          </div>
        )}

        <section className={sectionBase}>
          <h2 className="text-xl font-semibold text-gray-900">Company Screen</h2>
          <p className="text-sm text-gray-500">Update the company description question and options.</p>
          <div className="mt-6 space-y-4">
            <div>
              <label className={labelBase}>Question</label>
              <input
                className={inputBase}
                value={companyForm.title}
                onChange={(event) => setCompanyForm({ ...companyForm, title: event.target.value })}
              />
            </div>
            <div>
              <label className={labelBase}>Subtitle</label>
              <input
                className={inputBase}
                value={companyForm.subtitle}
                onChange={(event) => setCompanyForm({ ...companyForm, subtitle: event.target.value })}
              />
            </div>
            <div>
              <label className={labelBase}>Options</label>
              {renderOptionInputs(companyForm.options, (updated) => setCompanyForm({ ...companyForm, options: updated }))}
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => setCompanyForm(config.company)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700"
                onClick={handleCompanySave}
              >
                Save Company Screen
              </button>
            </div>
          </div>
        </section>

        <section className={sectionBase}>
          <h2 className="text-xl font-semibold text-gray-900">Challenges Screen</h2>
          <p className="text-sm text-gray-500">Manage the challenge question and selectable options.</p>
          <div className="mt-6 space-y-4">
            <div>
              <label className={labelBase}>Question</label>
              <input
                className={inputBase}
                value={challengeForm.title}
                onChange={(event) => setChallengeForm({ ...challengeForm, title: event.target.value })}
              />
            </div>
            <div>
              <label className={labelBase}>Subtitle</label>
              <input
                className={inputBase}
                value={challengeForm.subtitle}
                onChange={(event) => setChallengeForm({ ...challengeForm, subtitle: event.target.value })}
              />
            </div>
            <div>
              <label className={labelBase}>Maximum selections</label>
              <input
                type="number"
                min={1}
                className={inputBase}
                value={challengeForm.maxSelections}
                onChange={(event) =>
                  setChallengeForm({ ...challengeForm, maxSelections: Number(event.target.value) })
                }
              />
            </div>
            <div>
              <label className={labelBase}>Challenge options</label>
              {renderOptionInputs(
                challengeForm.options,
                (updated) => setChallengeForm({ ...challengeForm, options: updated }),
                false
              )}
            </div>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
                onClick={() => setChallengeForm(config.challenge)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700"
                onClick={handleChallengeSave}
              >
                Save Challenges
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminPage;
